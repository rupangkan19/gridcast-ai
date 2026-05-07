from typing import List, Dict
import os
import pandas as pd
import xgboost as xgb
from .assets import get_asset_by_id

solar_model = None
wind_model = None
models_loaded = False

def load_models():
    global solar_model, wind_model, models_loaded
    if models_loaded: return
    import joblib
    base_dir = os.path.dirname(os.path.abspath(__file__))
    solar_path = os.path.join(base_dir, "models", "solar_xgboost.joblib")
    wind_path = os.path.join(base_dir, "models", "wind_xgboost.joblib")
    
    if os.path.exists(solar_path) and os.path.exists(wind_path):
        try:
            solar_model = joblib.load(solar_path)
            wind_model = joblib.load(wind_path)
        except Exception as e:
            print("Error loading XGBoost models:", e)
    models_loaded = True

def generate_forecast(weather_data: List[Dict], asset_id: str) -> List[Dict]:
    load_models()
    
    forecasts = []
    asset = get_asset_by_id(asset_id)
    if not asset:
        asset = {"type": "hybrid", "capacityMW": 100} # fallback
        
    asset_type = asset["type"]
    capacity = asset["capacityMW"]
    
    # Split capacity if hybrid
    solar_cap = capacity if asset_type == "solar" else (capacity * 0.6 if asset_type == "hybrid" else 0)
    wind_cap = capacity if asset_type == "wind" else (capacity * 0.4 if asset_type == "hybrid" else 0)
    
    if solar_model is not None and wind_model is not None and len(weather_data) > 0:
        df_features = pd.DataFrame([{
            "temperature": w.get("temperature", 25.0),
            "cloud_cover": w.get("cloud_cover", 0),
            "wind_speed": w.get("wind_speed", 0),
            "irradiation": w.get("irradiation", 0)
        } for w in weather_data])
        
        solar_preds = solar_model.predict(df_features[["temperature", "cloud_cover", "irradiation"]])
        wind_preds = wind_model.predict(df_features[["temperature", "wind_speed"]])
    else:
        solar_preds = None
        wind_preds = None
        
    for i, w in enumerate(weather_data):
        # Solar logic
        base_solar = 0
        if solar_cap > 0:
            if solar_preds is not None:
                base_solar = max(0, solar_preds[i]) * solar_cap
            else:
                norm_irrad = min(1.0, w["irradiation"] / 1000)
                base_solar = norm_irrad * (1 - w["cloud_cover"] * 0.2) * solar_cap
                
        # Wind logic
        base_wind = 0
        if wind_cap > 0:
            if wind_preds is not None:
                base_wind = max(0, wind_preds[i]) * wind_cap
            else:
                ws = w["wind_speed"]
                if ws < 3 or ws > 25:
                    base_wind = 0
                else:
                    norm_wind = min(1.0, ((ws - 3) / 9) ** 3) # rated at 12m/s
                    base_wind = norm_wind * wind_cap
                
        solar_p50 = round(base_solar, 2)
        wind_p50 = round(base_wind, 2)
        total_p50 = round(solar_p50 + wind_p50, 2)
        
        solar_uncert = max(0.05, w["cloud_cover"] * 0.3) * solar_p50 if solar_p50 > 0 else 0
        wind_uncert = max(0.05, 0.2 if w["wind_speed"] > 10 else 0.4) * wind_p50 if wind_p50 > 0 else 0
        
        solar_p10 = round(max(0, solar_p50 - solar_uncert * 1.5), 2)
        solar_p90 = round(solar_p50 + solar_uncert * 1.5, 2)
        
        wind_p10 = round(max(0, wind_p50 - wind_uncert * 1.5), 2)
        wind_p90 = round(wind_p50 + wind_uncert * 1.5, 2)
        
        total_p10 = round(solar_p10 + wind_p10, 2)
        total_p90 = round(solar_p90 + wind_p90, 2)
        
        spread = total_p90 - total_p10
        if total_p50 > 0:
            if spread > total_p50 * 0.4:
                risk = "High"
            elif spread > total_p50 * 0.2:
                risk = "Medium"
            else:
                risk = "Low"
        else:
            risk = "Low"
            
        forecasts.append({
            "hour": w["hour"],
            "weather": w,
            "asset_type": asset_type,
            "capacity": capacity,
            "solar": {"p10": solar_p10, "p50": solar_p50, "p90": solar_p90},
            "wind": {"p10": wind_p10, "p50": wind_p50, "p90": wind_p90},
            "total": {"p10": total_p10, "p50": total_p50, "p90": total_p90},
            "risk": risk
        })
        
    return forecasts
