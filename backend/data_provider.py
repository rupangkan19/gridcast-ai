from pydantic import BaseModel
from typing import List, Optional

class WeatherData(BaseModel):
    hour: int
    temperature: float
    cloud_cover: float
    wind_speed: float
    irradiation: float

def get_weather_data(asset_id: str, target_date: str) -> List[WeatherData]:
    """
    Abstraction layer for weather data.
    """
    from .synthetic_data import generate_synthetic_weather
    return generate_synthetic_weather(asset_id, target_date)
