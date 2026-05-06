import React from 'react';
import { Activity, Zap, Shield, AlertCircle, ArrowRight, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useForecast } from '../context/ForecastContext';

const Insights = () => {
  const { selectedAsset, forecastData } = useForecast();

  const drivers = [
    { name: 'Solar Irradiation', impact: 'High', description: 'Primary driver for solar yield. Current forecast indicates a 15% drop during peak hours.', trend: 'down', color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600' },
    { name: 'Cloud Cover', impact: 'Medium', description: 'Scattered clouds expected between 13:00 and 15:00, increasing P10-P90 uncertainty band.', trend: 'up', color: 'bg-gray-100 dark:bg-gray-800 text-gray-600' },
    { name: 'Wind Speed', impact: 'Critical', description: 'Sustained winds above 12m/s stabilizing hybrid generation when solar dips.', trend: 'up', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' },
    { name: 'Temperature', impact: 'Low', description: 'Panel efficiency reduction is minimal (-1.2%) as temps remain below 30°C.', trend: 'stable', color: 'bg-red-50 dark:bg-red-900/20 text-red-600' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Operational Intelligence</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Explainability, uncertainty understanding, and operational patterns.</p>
      </div>

      {/* OPERATIONAL SUMMARY */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-lg font-bold mb-2 flex items-center"><Activity className="w-5 h-5 mr-2" /> Daily Operational Summary</h2>
          <p className="text-blue-100 leading-relaxed max-w-4xl">
            Solar peak timing is expected precisely at 13:45 today. Wind stabilization periods are active during the evening ramp (17:00-19:00). High uncertainty windows exist between 14:00-15:30 due to unpredicted cloud formations. Hybrid balancing effects will keep the grid within nominal operating bounds despite the solar dip.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
          <Shield className="w-48 h-48 -mr-10 -mb-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PRIMARY FORECAST DRIVERS */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Primary Forecast Drivers</h3>
          {drivers.map(driver => (
            <div key={driver.name} className="bg-white dark:bg-card-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-start">
              <div className={`p-2 rounded-lg mr-4 mt-1 ${driver.color}`}>
                {driver.trend === 'up' ? <TrendingUp className="w-5 h-5" /> : driver.trend === 'down' ? <TrendingDown className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 dark:text-white">{driver.name}</h4>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-500">Impact: {driver.impact}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{driver.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* CONFIDENCE & UNCERTAINTY */}
          <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Confidence & Uncertainty</h3>
            <div className="flex items-end space-x-6 mb-6">
              <div>
                <div className="text-4xl font-bold text-green-500">89%</div>
                <div className="text-sm text-gray-500 font-medium">Current Confidence</div>
              </div>
              <div className="flex-1">
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[89%]"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Confidence Trend: +2% from 06:00 run</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 rounded-lg text-sm text-blue-800 dark:text-blue-300">
              <strong>Why did confidence change?</strong> Clearer satellite imagery over the western corridor reduced the error margin on wind speed projections for the afternoon.
            </div>
          </div>

          {/* FORECAST QUALITY METRICS */}
          <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Forecast Quality (Last 30 Days)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Forecast Skill</div>
                <div className="font-bold text-lg">0.86 <span className="text-xs text-green-500 font-normal">Excellent</span></div>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Peak Accuracy</div>
                <div className="font-bold text-lg">94.2% <span className="text-xs text-green-500 font-normal">+1.2%</span></div>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Stability Accuracy</div>
                <div className="font-bold text-lg">98.9%</div>
              </div>
              <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Reliability</div>
                <div className="font-bold text-lg text-green-500">Tier 1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RISK PROPAGATION VIEW */}
      <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mt-6">
        <h3 className="font-semibold text-lg mb-6">Risk Propagation Flow</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center relative border border-gray-200 dark:border-gray-700 w-full">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">1. Weather Change</div>
            <div className="font-medium text-blue-600 dark:text-blue-400">Unexpected Cloud Front</div>
          </div>
          
          <ArrowRight className="hidden md:block text-gray-300" />
          
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700 w-full">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">2. Uncertainty Increase</div>
            <div className="font-medium text-yellow-600 dark:text-yellow-400">P90-P10 spread +40MW</div>
          </div>
          
          <ArrowRight className="hidden md:block text-gray-300" />
          
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700 w-full">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">3. Operational Impact</div>
            <div className="font-medium text-red-600 dark:text-red-400">Reserve Margin Drop</div>
          </div>
          
          <ArrowRight className="hidden md:block text-gray-300" />
          
          <div className="flex-1 bg-green-50 dark:bg-green-900/10 p-4 rounded-lg text-center border border-green-200 dark:border-green-900/50 w-full">
            <div className="text-xs text-green-600 uppercase font-semibold mb-1">4. Recommendation</div>
            <div className="font-medium text-green-700 dark:text-green-400">Dispatch +20MW Backup</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Insights;
