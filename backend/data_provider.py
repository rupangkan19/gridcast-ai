from pydantic import BaseModel
from typing import List, Optional

class WeatherData(BaseModel):
    hour: int
    temperature: float
    cloud_cover: float
    wind_speed: float
    irradiation: float

def get_weather_data(region: str) -> List[WeatherData]:
    """
    Abstraction layer for weather data.
    Currently falls back to synthetic generation.
    Future: integrate Open-Meteo API here.
    """
    from .synthetic_data import generate_synthetic_weather
    return generate_synthetic_weather(region)
