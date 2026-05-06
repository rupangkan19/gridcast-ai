from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from .data_provider import get_weather_data
from .model import generate_forecast
from .explain import generate_explanations
from .decision_engine import simulate_decision

app = FastAPI(title="GRIDCAST API", description="AI Renewable Energy Decision-Support System")

# CORS setup for Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict this to the Vercel domain
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

@app.get("/api/forecast/{region}")
def get_full_forecast(region: str):
    """
    Returns 24h forecast, weather data, explanations, and critical moments
    all in one payload to avoid multiple round-trips from the frontend.
    """
    weather_data = get_weather_data(region)
    forecasts = generate_forecast(weather_data)
    explanations, critical_moments = generate_explanations(forecasts)
    
    return {
        "region": region,
        "forecasts": forecasts,
        "explanations": explanations,
        "critical_moments": critical_moments
    }

@app.post("/api/simulate")
def run_simulation(req: DecisionRequest):
    """
    Runs a decision simulation for a specific hour.
    """
    # In a real app we'd fetch just the specific hour from a DB or cache
    weather_data = get_weather_data(req.region)
    forecasts = generate_forecast(weather_data)
    
    # Find the specific hour
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
