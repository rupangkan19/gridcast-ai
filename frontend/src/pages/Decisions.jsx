import React, { useState } from 'react';
import { Shield, Zap, AlertTriangle, Activity, ChevronDown, ChevronRight, Settings, Battery, Target, Check, Clock, Radio } from 'lucide-react';
import { useForecast } from '../context/ForecastContext';

const Decisions = () => {
  const { forecastData, selectedHour, selectedAsset } = useForecast();
  
  const [activeStrategy, setActiveStrategy] = useState('balanced');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Advanced Controls
  const [backupPct, setBackupPct] = useState(50);
  const [loadAdj, setLoadAdj] = useState(0);

  const currentData = forecastData?.find(d => d.hour === selectedHour) || forecastData?.[0];

  if (!currentData) return null;

  const strategies = [
    { id: 'conservative', name: 'Conservative Reserve', desc: 'Prioritize grid stability. High backup dispatch.', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
    { id: 'balanced', name: 'Balanced Operations', desc: 'Optimal mix of renewables and backup generation.', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-800' },
    { id: 'renewable_max', name: 'Renewable Maximized', desc: 'Aggressively utilize renewables. Higher risk tolerance.', icon: Zap, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' }
  ];

  const currentStrategy = strategies.find(s => s.id === activeStrategy);

  // Derived mock metrics based on strategy
  const riskReduction = activeStrategy === 'conservative' ? 45 : activeStrategy === 'balanced' ? 20 : -10;
  const reliabilityScore = activeStrategy === 'conservative' ? 99.9 : activeStrategy === 'balanced' ? 98.5 : 94.2;
  const costImpact = activeStrategy === 'conservative' ? '+12%' : activeStrategy === 'balanced' ? 'Nominal' : '-8%';

  return (
    <div className="animate-in fade-in duration-700 pb-12">
      
      {/* HERO SECTION: IMMERSIVE STATUS */}
      <div className="relative rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark shadow-sm">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Activity className="w-64 h-64" />
        </div>
        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 mb-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">Live Grid Command</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
              Operational Strategy Simulation
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Evaluating deployment postures for <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedAsset}</span> at <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedHour}:00</span> under observed uncertainty parameters.
            </p>
          </div>
          <div className="mt-6 md:mt-0 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700 text-right min-w-[200px]">
            <div className="text-sm font-medium text-gray-500 mb-1">Forecast Spread (P90-P10)</div>
            <div className="text-3xl font-black text-gray-900 dark:text-white">
              {Math.round(currentData.total.p90 - currentData.total.p10)} <span className="text-lg font-medium text-gray-400">MW</span>
            </div>
            <div className={`text-sm mt-2 font-medium ${currentData.risk === 'High' ? 'text-red-500' : currentData.risk === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              Threat Level: {currentData.risk}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: STRATEGY & CONTROLS (Asymmetric) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-5">Strategic Response Posture</h3>
            
            <div className="space-y-3">
              {strategies.map(strategy => {
                const isActive = activeStrategy === strategy.id;
                return (
                  <div 
                    key={strategy.id}
                    onClick={() => setActiveStrategy(strategy.id)}
                    className={`cursor-pointer border rounded-xl p-4 transition-all duration-300 ${isActive ? `ring-2 ring-offset-1 dark:ring-offset-gray-900 ring-${strategy.color.split('-')[1]}-500 ${strategy.border} ${strategy.bg}` : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center space-x-3">
                        <strategy.icon className={`w-5 h-5 ${isActive ? strategy.color : 'text-gray-400'}`} />
                        <span className={`font-semibold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{strategy.name}</span>
                      </div>
                      {isActive && <Check className={`w-4 h-4 ${strategy.color}`} />}
                    </div>
                    <p className={`text-sm ml-8 ${isActive ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>{strategy.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Advanced Controls Accordion */}
            <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4">
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="flex items-center"><Settings className="w-4 h-4 mr-2" /> Advanced Parameters</span>
                {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              
              {showAdvanced && (
                <div className="mt-4 space-y-5 animate-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="flex justify-between text-xs font-semibold mb-2 text-gray-600 dark:text-gray-400">
                      <span>Reserve Capacity Dispatch</span>
                      <span>{backupPct}%</span>
                    </label>
                    <input type="range" min="0" max="100" value={backupPct} onChange={(e) => setBackupPct(parseInt(e.target.value))} className="w-full accent-gray-600" />
                  </div>
                  <div>
                    <label className="flex justify-between text-xs font-semibold mb-2 text-gray-600 dark:text-gray-400">
                      <span>Load Shedding / Shifting</span>
                      <span>{loadAdj} MW</span>
                    </label>
                    <input type="range" min="-100" max="100" value={loadAdj} onChange={(e) => setLoadAdj(parseInt(e.target.value))} className="w-full accent-gray-600" />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Operations Timeline */}
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-5 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> Projected Timeline
            </h3>
            <div className="relative border-l-2 border-gray-100 dark:border-gray-800 ml-2 pl-5 space-y-6">
              <div className="relative">
                <div className="absolute -left-[27px] top-0 w-3 h-3 rounded-full bg-red-500 ring-4 ring-white dark:ring-card-dark"></div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">T-0: Threat Detected</div>
                <div className="text-xs text-gray-500 mt-1">Cloud cover anomaly increasing solar variability by 24%.</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[27px] top-0 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-card-dark"></div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">T+15m: Response Init</div>
                <div className="text-xs text-gray-500 mt-1">Deploying {currentStrategy.name} parameters. Spinning up reserves.</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[27px] top-0 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white dark:ring-card-dark"></div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">T+45m: System Stabilized</div>
                <div className="text-xs text-gray-500 mt-1">Grid frequency returns to nominal. Weather front passes.</div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER & RIGHT: DOMINANT VISUALIZATION & INTELLIGENCE */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Central Visualization Area */}
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-1 shadow-sm overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#0A0C10] rounded-xl p-6 h-[400px] relative flex flex-col justify-between border border-gray-100 dark:border-gray-800/50">
              <div className="flex justify-between items-start">
                <div className="text-sm font-semibold tracking-widest uppercase text-gray-400">Response Trajectory</div>
                <div className="px-3 py-1 bg-white/50 dark:bg-black/30 backdrop-blur border border-gray-200 dark:border-gray-800 rounded-full text-xs font-bold font-mono">
                  SIMULATION ACTIVE
                </div>
              </div>

              {/* Cinematic Chart Representation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12 pt-10">
                <div className="w-full h-48 flex items-end justify-between space-x-1">
                  {[...Array(30)].map((_, i) => {
                    const isMid = i > 10 && i < 20;
                    const heightBase = isMid ? (activeStrategy === 'conservative' ? 60 : activeStrategy === 'balanced' ? 40 : 25) : 70;
                    // Use a pseudo-random deterministic value based on index to avoid re-render jitter
                    const noise = (Math.sin(i * 13.4) * 0.5 + 0.5) * 15;
                    const h = heightBase + noise;
                    return (
                      <div key={i} className="flex-1 h-full flex flex-col justify-end group">
                        <div 
                          className={`w-full rounded-t-sm transition-all duration-1000 ease-in-out ${isMid ? (activeStrategy === 'conservative' ? 'bg-blue-500' : activeStrategy === 'balanced' ? 'bg-indigo-500' : 'bg-red-400') : 'bg-gray-300 dark:bg-gray-700'}`} 
                          style={{ height: `${h}%`, opacity: 0.8 }}
                        ></div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="relative z-10 flex justify-between items-end">
                <div className="backdrop-blur-md bg-white/70 dark:bg-black/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Projected Outcome</div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">System Stable</div>
                </div>
                <div className="flex space-x-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-bold uppercase">Grid Inertia</div>
                    <div className="font-mono text-sm text-gray-900 dark:text-white">Nominal</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-bold uppercase">Frequency</div>
                    <div className="font-mono text-sm text-gray-900 dark:text-white">50.02 Hz</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Operations Center & Metrics (Side-by-side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Conversational AI Output */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-[#111318] dark:to-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-white">Intelligence Dispatch</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  Based on the <span className="font-semibold text-gray-900 dark:text-white">{currentStrategy.name}</span> posture, we anticipate a <span className="font-bold text-green-600">{riskReduction}% reduction</span> in instability risk over the next 2 hours.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {activeStrategy === 'conservative' 
                    ? "Dispatching thermal reserves to compensate for the P10 solar drop. This guarantees stability but incurs operational penalties."
                    : activeStrategy === 'balanced'
                    ? "Relying on battery energy storage (BESS) and minor load shedding. A cost-effective approach given the moderate weather threat."
                    : "Maximized renewable utilization implies accepting higher grid volatility. Ensure fast-acting frequency response services are armed."}
                </p>
              </div>
            </div>

            {/* Outcome Metrics */}
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col justify-center">
              <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-6">Execution Impact</h3>
              
              <div className="space-y-5">
                <div className="flex justify-between items-end border-b border-gray-100 dark:border-gray-800 pb-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Reliability Index</span>
                  <span className={`text-xl font-bold ${reliabilityScore > 98 ? 'text-green-500' : 'text-yellow-500'}`}>{reliabilityScore}%</span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-100 dark:border-gray-800 pb-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Risk Mitigation</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">-{riskReduction}%</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Cost Impact</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white font-mono">{costImpact}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Decisions;
