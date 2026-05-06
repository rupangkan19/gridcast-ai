import React, { useState, useEffect } from 'react';
import { useForecast } from '../context/ForecastContext';
import { Shield, Zap, TrendingDown } from 'lucide-react';

const Decisions = () => {
  const { selectedRegion, selectedHour, forecastData } = useForecast();
  const [simulation, setSimulation] = useState(null);
  
  // Decision Controls
  const [backupPct, setBackupPct] = useState(50);
  const [renewablePct, setRenewablePct] = useState(80);
  const [loadAdj, setLoadAdj] = useState(0);

  const currentData = forecastData?.find(d => d.hour === selectedHour) || forecastData?.[0];

  useEffect(() => {
    if (!currentData) return;

    const runSim = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${baseUrl}/api/simulate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            region: selectedRegion,
            hour: selectedHour,
            backup_pct: backupPct,
            renewable_pct: renewablePct,
            load_adj: loadAdj
          })
        });
        const result = await response.json();
        setSimulation(result);
      } catch (err) {
        console.error("Simulation failed", err);
      }
    };
    runSim();
  }, [selectedRegion, selectedHour, backupPct, renewablePct, loadAdj, currentData]);

  if (!currentData) return <div className="p-8 text-center text-gray-500">Loading decision engine...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Decision Simulator</h1>
        <p className="text-gray-500 mt-1">Simulate operational strategies based on current uncertainty models.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls */}
        <div className="lg:col-span-1 bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 space-y-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Operational Parameters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>Backup Generation (Coal/Gas)</span>
                  <span className="text-blue-600 dark:text-blue-400">{backupPct}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" 
                  value={backupPct} 
                  onChange={(e) => setBackupPct(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>Renewable Dependency</span>
                  <span className="text-green-600 dark:text-green-400">{renewablePct}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" 
                  value={renewablePct} 
                  onChange={(e) => setRenewablePct(parseInt(e.target.value))}
                  className="w-full accent-green-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>Load Adjustment</span>
                  <span className={loadAdj < 0 ? 'text-red-500' : 'text-gray-600'}>
                    {loadAdj > 0 ? '+' : ''}{loadAdj} MW
                  </span>
                </label>
                <input 
                  type="range" min="-50" max="50" 
                  value={loadAdj} 
                  onChange={(e) => setLoadAdj(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Health Score Gauge */}
          <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Grid Health Score</h3>
              <p className="text-sm text-gray-500 mt-1">Based on P10 worst-case scenario</p>
            </div>
            <div className="flex items-center">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle className="text-gray-200 dark:text-gray-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="48" cy="48" />
                  <circle 
                    className={`${simulation?.health_score > 80 ? 'text-green-500' : simulation?.health_score > 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000`} 
                    strokeWidth="8" 
                    strokeDasharray={251.2} 
                    strokeDashoffset={251.2 - (251.2 * (simulation?.health_score || 0)) / 100}
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" cx="48" cy="48" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{simulation?.health_score || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`rounded-xl p-6 border shadow-sm ${
            simulation?.stability === 'High' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 text-green-800 dark:text-green-300' :
            simulation?.stability === 'Medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 text-yellow-800 dark:text-yellow-300' :
            'bg-red-50 dark:bg-red-900/20 border-red-200 text-red-800 dark:text-red-300'
          }`}>
            <div className="flex items-start">
              <Shield className="h-6 w-6 mr-3 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg mb-2">AI Recommendation</h3>
                <p className="opacity-90">{simulation?.recommendation || "Analyzing..."}</p>
              </div>
            </div>
          </div>

          {/* Context Details */}
          <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
             <h3 className="font-semibold mb-4">Underlying Forecast (Hour {selectedHour}:00)</h3>
             <div className="grid grid-cols-3 gap-4">
               <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                 <div className="text-sm text-gray-500 mb-1">Expected (P50)</div>
                 <div className="font-bold">{currentData.total.p50} MW</div>
               </div>
               <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                 <div className="text-sm text-gray-500 mb-1 text-red-500">Worst Case (P10)</div>
                 <div className="font-bold text-red-600 dark:text-red-400">{currentData.total.p10} MW</div>
               </div>
               <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                 <div className="text-sm text-gray-500 mb-1 text-green-500">Best Case (P90)</div>
                 <div className="font-bold text-green-600 dark:text-green-400">{currentData.total.p90} MW</div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Decisions;
