from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
from datetime import datetime

from .data_provider import get_weather_data
from .model import generate_forecast
from .explain import generate_explanations
from .decision_engine import simulate_decision
import os
from contextlib import asynccontextmanager
from .train_xgboost import train_and_save

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Train models on startup if missing
    base_dir = os.path.dirname(os.path.abspath(__file__))
    solar_path = os.path.join(base_dir, "models", "solar_xgboost.joblib")
    wind_path = os.path.join(base_dir, "models", "wind_xgboost.joblib")
    
    if not os.path.exists(solar_path) or not os.path.exists(wind_path):
        print("XGBoost models not found. Training models now...")
        train_and_save()
    else:
        print("XGBoost models found. Skipping training.")
        
    yield

app = FastAPI(title="GRIDCAST API", description="AI Renewable Energy Decision-Support System", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DecisionRequest(BaseModel):
    region: str
    hour: int
    backup_pct: float
    renewable_pct: float
    load_adj: float

@app.get("/api/health")
def health_check():
    return {"status": "operational"}

@app.get("/api/forecast/{asset_id}")
def get_full_forecast(asset_id: str, date: Optional[str] = None):
    """
    Returns 24h forecast for a specific asset on a given date.
    """
    if not date:
        date = datetime.now().strftime("%Y-%m-%d")
        
    weather_data = get_weather_data(asset_id, date)
    forecasts = generate_forecast(weather_data, asset_id)
    explanations, critical_moments = generate_explanations(forecasts)
    
    return {
        "asset_id": asset_id,
        "date": date,
        "forecasts": forecasts,
        "explanations": explanations,
        "critical_moments": critical_moments
    }

@app.post("/api/simulate")
def run_simulation(req: DecisionRequest):
    weather_data = get_weather_data(req.region, datetime.now().strftime("%Y-%m-%d"))
    forecasts = generate_forecast(weather_data, req.region)
    hour_forecast = next((f for f in forecasts if f["hour"] == req.hour), None)
    if not hour_forecast:
        return {"error": "Hour not found"}
        
    result = simulate_decision(
        forecast=hour_forecast,
        backup_pct=req.backup_pct,
        renewable_pct=req.renewable_pct,
        load_adj=req.load_adj
    )
    return result

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
