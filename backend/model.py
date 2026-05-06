from typing import List, Dict

def generate_forecast(weather_data: List[Dict]) -> List[Dict]:
    """
    Physics-informed synthetic logic for renewable forecasting.
    Includes uncertainty bands (P10, P50, P90).
    """
    forecasts = []
    
    for w in weather_data:
        # Solar logic: irradiation * (1 - cloud_cover) * efficiency * scale
        base_solar = w["irradiation"] * (1 - w["cloud_cover"]) * 0.15 * 0.5
        
        # Wind logic: wind_speed^3 * scale
        # Power curve: cut-in = 3, rated = 12, cut-out = 25
        wind_speed = w["wind_speed"]
        if wind_speed < 3 or wind_speed > 25:
            base_wind = 0
        else:
            base_wind = min((wind_speed ** 3) * 0.05, 100) # Capped at rated power roughly
            
        # P50 (expected)
        solar_p50 = round(base_solar, 2)
        wind_p50 = round(base_wind, 2)
        total_p50 = round(solar_p50 + wind_p50, 2)
        
        # Uncertainty modeling based on cloud cover (for solar) and wind speed variability
        solar_uncertainty = max(0.05, w["cloud_cover"] * 0.3) * solar_p50
        wind_uncertainty = max(0.05, 0.2 if wind_speed > 10 else 0.4) * wind_p50
        
        # P10 and P90
        solar_p10 = round(max(0, solar_p50 - solar_uncertainty * 1.5), 2)
        solar_p90 = round(solar_p50 + solar_uncertainty * 1.5, 2)
        
        wind_p10 = round(max(0, wind_p50 - wind_uncertainty * 1.5), 2)
        wind_p90 = round(wind_p50 + wind_uncertainty * 1.5, 2)
        
        total_p10 = round(solar_p10 + wind_p10, 2)
        total_p90 = round(solar_p90 + wind_p90, 2)
        
        # Risk classification
        spread = total_p90 - total_p10
        if spread > total_p50 * 0.4:
            risk = "High"
        elif spread > total_p50 * 0.2:
            risk = "Medium"
        else:
            risk = "Low"
            
        forecasts.append({
            "hour": w["hour"],
            "weather": w,
            "solar": {"p10": solar_p10, "p50": solar_p50, "p90": solar_p90},
            "wind": {"p10": wind_p10, "p50": wind_p50, "p90": wind_p90},
            "total": {"p10": total_p10, "p50": total_p50, "p90": total_p90},
            "risk": risk
        })
        
    return forecasts
