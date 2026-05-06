import React from 'react';
import { useForecast } from '../context/ForecastContext';

const MetricsPanel = ({ data }) => {
  if (!data) return null;

  const showSolar = data.asset_type === 'solar' || data.asset_type === 'hybrid';
  const showWind = data.asset_type === 'wind' || data.asset_type === 'hybrid';
  
  // Dynamic grid cols based on what is shown
  const cols = showSolar && showWind ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div className={`grid grid-cols-1 ${cols} gap-4 h-full`}>
      
      <div className="bg-white dark:bg-card-dark rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Expected (P50)</div>
        <div className="text-3xl font-bold mt-2">{data.total.p50} <span className="text-lg text-gray-400 font-normal">MW</span></div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between text-sm">
           <span className="text-gray-500">P10: {data.total.p10}</span>
           <span className="text-gray-500">P90: {data.total.p90}</span>
        </div>
      </div>

      {showSolar && (
        <div className="bg-white dark:bg-card-dark rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span> Solar Generation</div>
          <div className="text-3xl font-bold mt-2">{data.solar.p50} <span className="text-lg text-gray-400 font-normal">MW</span></div>
          <div className="mt-4 text-xs text-gray-400">
             Irradiation: {data.weather.irradiation} W/m² <br/> Cloud Cover: {Math.round(data.weather.cloud_cover * 100)}%
          </div>
        </div>
      )}

      {showWind && (
        <div className="bg-white dark:bg-card-dark rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span> Wind Generation</div>
          <div className="text-3xl font-bold mt-2">{data.wind.p50} <span className="text-lg text-gray-400 font-normal">MW</span></div>
          <div className="mt-4 text-xs text-gray-400">
             Wind Speed: {data.weather.wind_speed} m/s
          </div>
        </div>
      )}

    </div>
  );
};

export default MetricsPanel;
