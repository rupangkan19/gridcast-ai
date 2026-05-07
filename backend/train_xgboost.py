import pandas as pd
import numpy as np
import xgboost as xgb
import requests
from datetime import datetime, timedelta
import joblib
import os

# Create data dir if not exists
os.makedirs("models", exist_ok=True)

def fetch_historical_weather(lat, lon, start_date, end_date):
    print(f"Fetching Open-Meteo historical data for {lat}, {lon} from {start_date} to {end_date}...")
    url = f"https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start_date,
        "end_date": end_date,
        "hourly": "temperature_2m,cloudcover,windspeed_10m,direct_radiation",
        "timezone": "auto"
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    
    df = pd.DataFrame(data["hourly"])
    df["time"] = pd.to_datetime(df["time"])
    return df

def generate_power_targets(df):
    """
    Since actual plant-level historical MW data isn't publicly available,
    we map the real historical weather to power efficiency (0.0 to 1.0)
    using physical formulas and add real-world noise.
    """
    print("Generating simulated historical power targets...")
    
    # Extract features
    temp = df["temperature_2m"].values
    cloud = df["cloudcover"].values / 100.0  # Open-Meteo cloud cover is 0-100
    wind = df["windspeed_10m"].values / 3.6  # Convert km/h to m/s
    irrad = df["direct_radiation"].values
    
    # Solar normalized target
    # Efficiency drops slightly with temperature increase
    temp_penalty = np.maximum(0, (temp - 25) * 0.004)
    base_solar = np.clip(irrad / 1000.0, 0, 1) * (1 - cloud * 0.3) * (1 - temp_penalty)
    noise_solar = np.random.normal(0, 0.05, len(base_solar))
    target_solar = np.clip(base_solar + noise_solar, 0, 1)
    
    # Wind normalized target
    # Cut-in: 3 m/s, Rated: 12 m/s, Cut-out: 25 m/s
    base_wind = np.zeros_like(wind)
    valid_wind = (wind >= 3) & (wind <= 25)
    base_wind[valid_wind] = np.clip(((wind[valid_wind] - 3) / 9) ** 3, 0, 1)
    noise_wind = np.random.normal(0, 0.08, len(base_wind))
    target_wind = np.clip(base_wind + noise_wind, 0, 1)
    
    # Final dataframe for training
    df_train = pd.DataFrame({
        "temperature": temp,
        "cloud_cover": cloud,
        "wind_speed": wind,
        "irradiation": irrad,
        "target_solar": target_solar,
        "target_wind": target_wind
    })
    
    # Drop NaNs just in case
    df_train = df_train.dropna()
    return df_train

def train_and_save():
    # Use Pavagada coordinates as representative historical weather
    end_date = datetime.now() - timedelta(days=5)
    start_date = end_date - timedelta(days=365 * 2) # 2 years of data
    
    df_weather = fetch_historical_weather(14.0994, 77.2800, start_date.strftime("%Y-%m-%d"), end_date.strftime("%Y-%m-%d"))
    df_train = generate_power_targets(df_weather)
    
    print("Training XGBoost Solar Model...")
    X_solar = df_train[["temperature", "cloud_cover", "irradiation"]]
    y_solar = df_train["target_solar"]
    
    solar_model = xgb.XGBRegressor(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
    solar_model.fit(X_solar, y_solar)
    
    print("Training XGBoost Wind Model...")
    X_wind = df_train[["temperature", "wind_speed"]]
    y_wind = df_train["target_wind"]
    
    wind_model = xgb.XGBRegressor(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
    wind_model.fit(X_wind, y_wind)
    
    # Save models
    import os
    import joblib
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(os.path.join(base_dir, "models"), exist_ok=True)
    joblib.dump(solar_model, os.path.join(base_dir, "models", "solar_xgboost.joblib"))
    joblib.dump(wind_model, os.path.join(base_dir, "models", "wind_xgboost.joblib"))
    
    # Evaluate briefly
    solar_score = solar_model.score(X_solar, y_solar)
    wind_score = wind_model.score(X_wind, y_wind)
    print(f"Training Complete! Solar R2: {solar_score:.3f}, Wind R2: {wind_score:.3f}")

if __name__ == "__main__":
    train_and_save()
