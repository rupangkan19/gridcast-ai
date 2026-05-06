import math
import random

def generate_synthetic_weather(asset_id: str, target_date: str):
    """
    Generates synthetic 24-hour weather data based on standard profiles.
    Seeds based on asset_id and date so different days look different.
    """
    data = []
    base_temp = 25
    
    # Random seed for consistency per day/asset
    seed_val = hash(f"{asset_id}_{target_date}") % 10000
    random.seed(seed_val)
    
    base_cloud = random.uniform(0, 0.8) # Allow higher cloud cover on some days
    wind_base = random.uniform(2.0, 12.0) # Varies day to day
    
    for h in range(24):
        temp = base_temp - 5 * math.cos((h - 4) * math.pi / 12) + random.uniform(-1, 1)
        
        if 6 <= h <= 18:
            irradiation = 1000 * math.sin((h - 6) * math.pi / 12) + random.uniform(-50, 50)
            # Apply cloud cover penalty
            irradiation = max(0, irradiation * (1 - base_cloud * 0.5))
        else:
            irradiation = 0
            
        cloud_cover = base_cloud + 0.2 * math.sin(h * math.pi / 6) + random.uniform(-0.1, 0.1)
        cloud_cover = max(0.0, min(1.0, cloud_cover))
        
        wind_speed = wind_base + 3 * math.sin((h - 12) * math.pi / 12) + random.uniform(-2, 2)
        wind_speed = max(0.0, wind_speed)
        
        data.append({
            "hour": h,
            "temperature": round(temp, 1),
            "cloud_cover": round(cloud_cover, 2),
            "wind_speed": round(wind_speed, 1),
            "irradiation": round(irradiation, 1)
        })
        
    return data
