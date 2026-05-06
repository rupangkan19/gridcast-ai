import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { Activity, Wind, Sun, AlertTriangle } from 'lucide-react';

// Components
import ForecastChart from '../components/ForecastChart';
import RiskCard from '../components/RiskCard';
import MetricsPanel from '../components/MetricsPanel';
import ExplanationPanel from '../components/ExplanationPanel';
import AlertsPanel from '../components/AlertsPanel';
import MapView from '../components/MapView';

const Dashboard = () => {
  const { forecastData, selectedHour, isLoading, error } = useForecast();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
        <div className="flex items-center mb-2">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Error Loading Forecast</h3>
        </div>
        <p>{error}</p>
      </div>
    );
  }

  if (!forecastData) return null;

  // Find data for selected hour
  const currentData = forecastData.find(d => d.hour === selectedHour) || forecastData[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Grid Operations Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time forecasting and uncertainty analysis.</p>
        </div>
        
        {/* Simple Time Slider directly in dashboard header for prototype */}
        <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 px-4 py-2 flex items-center space-x-4">
           <span className="text-sm font-medium">Time: {selectedHour}:00</span>
           <input 
             type="range" 
             min="0" max="23" 
             value={selectedHour}
             onChange={(e) => useForecast().setSelectedHour(parseInt(e.target.value))}
             className="w-32 accent-blue-600"
           />
        </div>
      </div>

      {/* Top Row: Map Placeholder & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative h-64 flex items-center justify-center z-0">
            <MapView />
        </div>
        <div className="lg:col-span-2">
          <MetricsPanel data={currentData} />
        </div>
      </div>

      {/* Main Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="text-lg font-semibold mb-4">24-Hour Generation Forecast</h3>
          <div className="h-72">
            <ForecastChart data={forecastData} selectedHour={selectedHour} />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <RiskCard risk={currentData.risk} />
          <AlertsPanel hour={selectedHour} />
        </div>
      </div>

      {/* Bottom Row: Insights */}
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
         <ExplanationPanel hour={selectedHour} />
      </div>

    </div>
  );
};

export default Dashboard;
