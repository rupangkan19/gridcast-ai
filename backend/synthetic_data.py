import math
import random

def generate_synthetic_weather(region: str):
    """
    Generates synthetic 24-hour weather data based on standard profiles.
    """
    # Seed based on region to make it consistent
    # For now, just generate random but plausible daily curves
    
    data = []
    base_temp = 25
    
    # Random seed for demo stability
    random.seed(hash(region) % 10000)
    
    base_cloud = random.uniform(0, 0.5)
    wind_base = random.uniform(3.0, 8.0)
    
    for h in range(24):
        # Temperature curve (peaks around 14:00)
        temp = base_temp - 5 * math.cos((h - 4) * math.pi / 12) + random.uniform(-1, 1)
        
        # Solar irradiation curve (bell shape between 6 and 18)
        if 6 <= h <= 18:
            irradiation = 1000 * math.sin((h - 6) * math.pi / 12) + random.uniform(-50, 50)
            irradiation = max(0, irradiation)
        else:
            irradiation = 0
            
        # Cloud cover (varies slowly)
        cloud_cover = base_cloud + 0.2 * math.sin(h * math.pi / 6) + random.uniform(-0.1, 0.1)
        cloud_cover = max(0.0, min(1.0, cloud_cover))
        
        # Wind speed (some daily pattern)
        wind_speed = wind_base + 2 * math.sin((h - 12) * math.pi / 12) + random.uniform(-1, 1)
        wind_speed = max(0.0, wind_speed)
        
        data.append({
            "hour": h,
            "temperature": round(temp, 1),
            "cloud_cover": round(cloud_cover, 2),
            "wind_speed": round(wind_speed, 1),
            "irradiation": round(irradiation, 1)
        })
        
    return data
