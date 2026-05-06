import React, { useState, useEffect } from 'react';
import { useForecast } from '../context/ForecastContext';
import ForecastChart from '../components/ForecastChart';

const Exploration = () => {
  const { selectedAsset, forecastData, selectedHour } = useForecast();
  
  const currentData = forecastData?.find(d => d.hour === selectedHour) || forecastData?.[0];
  const defaultCloud = currentData?.weather?.cloud_cover || 0;
  const defaultWind = currentData?.weather?.wind_speed || 0;

  const [cloudModifier, setCloudModifier] = useState(defaultCloud);
  const [windModifier, setWindModifier] = useState(defaultWind);

  // Sync modifiers when default changes (e.g. user changes time/asset)
  useEffect(() => {
    setCloudModifier(defaultCloud);
    setWindModifier(defaultWind);
  }, [defaultCloud, defaultWind]);

  if (!forecastData) return null;

  // Create scenario data by scaling the weather impacts
  const scenarioData = forecastData.map(d => {
    // We only apply the modifier heavily to the selected hour for demonstration, 
    // or apply it globally. Let's apply it globally to show a different curve.
    
    // Original values
    const origCloud = d.weather.cloud_cover;
    const origWind = d.weather.wind_speed;
    
    // Delta from default at current hour
    const cloudDelta = cloudModifier - defaultCloud;
    const windDelta = windModifier - defaultWind;
    
    // New values
    const newCloud = Math.max(0, Math.min(1, origCloud + cloudDelta));
    const newWind = Math.max(0, origWind + windDelta);
    
    // Logic: Solar depends on cloud cover, wind depends on wind speed
    // If cloud cover goes up, solar goes down.
    const solarRatio = origCloud < 1 ? (1 - newCloud) / (1 - origCloud) : 0;
    const newSolar = d.solar.p50 * (Number.isNaN(solarRatio) ? 1 : solarRatio);
    
    // Wind power is proportional to wind_speed^3, bounded
    const origWindPower = Math.pow(Math.max(3, origWind), 3);
    const newWindPower = Math.pow(Math.max(3, newWind), 3);
    const windRatio = origWindPower > 0 ? newWindPower / origWindPower : 1;
    const newWindGen = d.wind.p50 * windRatio;

    return {
      ...d,
      weather: {
        ...d.weather,
        cloud_cover: newCloud,
        wind_speed: newWind
      },
      solar: { p50: newSolar },
      wind: { p50: newWindGen },
      total: { 
        p50: newSolar + newWindGen,
        p10: (newSolar + newWindGen) * 0.8,
        p90: (newSolar + newWindGen) * 1.2
      }
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Scenario Exploration</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Test hypothetical weather conditions on the selected asset.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-card-dark p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="font-semibold mb-4">Weather Modifiers</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Default at {selectedHour}:00</div>
              <div className="flex justify-between text-sm">
                <span>Cloud Cover: <strong>{Math.round(defaultCloud * 100)}%</strong></span>
                <span>Wind Speed: <strong>{defaultWind.toFixed(1)} m/s</strong></span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Simulated Cloud Cover: {Math.round(cloudModifier * 100)}%
              </label>
              <input 
                type="range" min="0" max="1" step="0.05" 
                value={cloudModifier} 
                onChange={(e) => setCloudModifier(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-xs text-gray-500 mt-1">Impacts solar generation.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Simulated Wind Speed: {windModifier.toFixed(1)} m/s
              </label>
              <input 
                type="range" min="0" max="25" step="0.5" 
                value={windModifier} 
                onChange={(e) => setWindModifier(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-xs text-gray-500 mt-1">Impacts wind generation (0-25 m/s).</p>
            </div>
            
            <button 
              onClick={() => { setCloudModifier(defaultCloud); setWindModifier(defaultWind); }}
              className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium transition-colors"
            >
              Reset to Default
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-card-dark p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm h-96">
          <h3 className="font-semibold mb-4">Scenario Generation Projection</h3>
          <ForecastChart data={scenarioData} selectedHour={selectedHour} />
        </div>
      </div>
    </div>
  );
};

export default Exploration;
