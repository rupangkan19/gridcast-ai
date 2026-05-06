from typing import List, Dict
from .assets import get_asset_by_id

def generate_forecast(weather_data: List[Dict], asset_id: str) -> List[Dict]:
    forecasts = []
    asset = get_asset_by_id(asset_id)
    if not asset:
        asset = {"type": "hybrid", "capacityMW": 100} # fallback
        
    asset_type = asset["type"]
    capacity = asset["capacityMW"]
    
    # Split capacity if hybrid
    solar_cap = capacity if asset_type == "solar" else (capacity * 0.6 if asset_type == "hybrid" else 0)
    wind_cap = capacity if asset_type == "wind" else (capacity * 0.4 if asset_type == "hybrid" else 0)
    
    for w in weather_data:
        # Solar logic: irradiation * (1 - cloud_cover) * efficiency * scale
        base_solar = 0
        if solar_cap > 0:
            norm_irrad = min(1.0, w["irradiation"] / 1000)
            base_solar = norm_irrad * (1 - w["cloud_cover"] * 0.2) * solar_cap
            
        # Wind logic: wind_speed^3 * scale
        base_wind = 0
        if wind_cap > 0:
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
