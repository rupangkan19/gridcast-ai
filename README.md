# GRIDCAST - AI Renewable Energy Decision-Support System

GRIDCAST is a professional operational decision-support platform for renewable energy forecasting and planning. It provides real-time insights, uncertainty modeling, explainable AI alerts, and a decision simulator for grid operators.

## Architecture

The system is split into a robust Python backend and a modern React frontend.

### Backend (`/backend`)
- **Framework:** FastAPI
- **Data Provider Layer:** Abstracted layer to fetch weather data. Currently uses synthetic generation but is ready for Open-Meteo API integration.
- **Forecasting Engine:** Physics-informed models with built-in uncertainty bands (P10, P50, P90).
- **Explainability & Alerts:** Automatically detects critical moments and generates human-readable explanations for weather/generation patterns.
- **Decision Engine:** Simulates the effect of backup generation, renewable dependency, and load adjustments to output a Grid Health Score.

### Frontend (`/frontend`)
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (v4) with fully supported light/dark modes.
- **State Management:** React Context (`ForecastContext.jsx`) synchronizes the hour, region, and forecast data across all views simultaneously without page reloads.
- **Components:** Recharts for dynamic charts, React-Leaflet for interactive map views, and custom UI components built with Lucide React icons.

## Setup & Local Development

### 1. Backend Setup
1. Open a terminal and navigate to the project root.
2. Ensure you have Python installed.
3. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   python -m backend.main
   ```
   *The API will run on `http://localhost:8000`*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`*

## API Endpoints
- `GET /api/health`: Health check.
- `GET /api/forecast/{region}`: Returns 24h forecast, weather data, explanations, and critical moments for the requested region.
- `POST /api/simulate`: Runs a decision simulation for a specific hour based on backup percentage, renewable percentage, and load adjustments.

## Deployment Guide

### Frontend (Vercel)
The frontend is pre-configured for Vercel deployment with `vercel.json` and a standard Vite build configuration.
1. Push the repository to GitHub.
2. In Vercel, import the project.
3. Set the **Framework Preset** to `Vite`.
4. Set the **Root Directory** to `frontend`.
5. Deploy.

### Backend (Render)
The backend includes a `render.yaml` configuration file for zero-config deployment.
1. In Render, create a new Web Service.
2. Connect your repository.
3. Render will automatically detect the `render.yaml` blueprint and deploy the FastAPI backend.
