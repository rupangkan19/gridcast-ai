import React from 'react';
import { Server, Activity, Database, Zap, ArrowRight, ShieldCheck, Cpu, HardDrive, Wifi, Clock, Terminal, CheckCircle } from 'lucide-react';

const System = () => {
  return (
    <div className="animate-in fade-in duration-700 pb-12">
      
      {/* SYSTEM STATUS HERO */}
      <div className="bg-[#0A0C10] text-white rounded-2xl p-8 md:p-10 mb-8 border border-gray-800 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-green-400 uppercase">System Optimal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Infrastructure Command</h1>
            <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
              Monitoring internal data pipelines, model inference latency, and operational failovers. GridCast architecture is actively processing millions of data points across the fleet.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-6">
            <div className="text-right">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Inference Latency</div>
              <div className="text-2xl font-mono font-bold text-white">42<span className="text-sm text-gray-500">ms</span></div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Uptime</div>
              <div className="text-2xl font-mono font-bold text-white">99.99<span className="text-sm text-gray-500">%</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE ARCHITECTURE VISUALIZATION */}
      <div className="mb-8 bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 overflow-hidden relative">
        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-8">Live Telemetry Flow</h3>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto py-10">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-10 hidden md:block transform -translate-y-1/2">
             <div className="h-full bg-blue-500 w-1/3 animate-pulse"></div>
          </div>

          {/* Nodes */}
          {[
            { name: 'Weather APIs', icon: Wifi, status: 'Syncing', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { name: 'Data Pipeline', icon: Database, status: 'Processing', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
            { name: 'Forecast Engine', icon: Cpu, status: 'Inferencing', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            { name: 'Decision Layer', icon: Zap, status: 'Optimizing', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
            { name: 'Client View', icon: Activity, status: 'Streaming', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' }
          ].map((node, i) => (
            <div key={node.name} className="flex flex-col items-center mb-6 md:mb-0 bg-white dark:bg-card-dark px-2">
              <div className={`w-16 h-16 rounded-2xl ${node.bg} ${node.color} flex items-center justify-center mb-3 shadow-sm border border-gray-100 dark:border-gray-800 relative group`}>
                <node.icon className="w-7 h-7" />
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current opacity-20 transition-all duration-300"></div>
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{node.name}</div>
              <div className="text-xs font-mono text-gray-400 mt-1">{node.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CORE SERVICES HEALTH */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6 flex items-center"><Server className="w-4 h-4 mr-2" /> Core Services Health</h3>
            
            <div className="space-y-4">
              {[
                { name: 'FastAPI Backend Core', latency: '12ms', status: 'Healthy', uptime: '14d 2h' },
                { name: 'Weather Sync Worker', latency: '240ms', status: 'Healthy', uptime: '14d 2h' },
                { name: 'Uncertainty Model (PyTorch)', latency: '85ms', status: 'Healthy', uptime: '5d 11h' },
                { name: 'PostgreSQL Timeseries DB', latency: '4ms', status: 'Healthy', uptime: '30d 0h' },
              ].map(service => (
                <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-4">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{service.name}</div>
                      <div className="text-xs text-gray-500">Uptime: {service.uptime}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-gray-900 dark:text-white">{service.latency}</div>
                    <div className="text-xs text-green-500 font-medium">{service.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RELIABILITY & FAILOVER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Failover Protocols</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold">Synthetic Weather Backup</div>
                    <div className="text-xs text-gray-500">Active if Open-Meteo API drops.</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold">Cached Inference Recovery</div>
                    <div className="text-xs text-gray-500">Serves last P50 forecast on engine crash.</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">System Capabilities</h3>
              <div className="flex flex-wrap gap-2">
                {['Plant-level forecasting', 'Cluster aggregation', 'P10/P50/P90 bands', 'SHAP explainability', 'Live operational simulator'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* EVENT LOGS (Terminal Style) */}
        <div className="lg:col-span-1">
          <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 shadow-xl h-full flex flex-col overflow-hidden">
            <div className="bg-[#2D2D2D] px-4 py-3 border-b border-gray-800 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-mono text-gray-400">system_event_stream.log</span>
            </div>
            <div className="p-4 flex-1 space-y-3 overflow-y-auto font-mono text-xs">
              <div className="text-green-400">[SYS] Weather sync completed (642ms)</div>
              <div className="text-blue-400">[INF] Recomputing forecast for asset_id: pavagada</div>
              <div className="text-blue-400">[INF] P10/P90 bands generated successfully</div>
              <div className="text-gray-400">[API] GET /api/forecast/pavagada 200 OK</div>
              <div className="text-yellow-400">[WRN] Uncertainty spike detected at hour 14</div>
              <div className="text-purple-400">[DEC] Generating operational recommendation...</div>
              <div className="text-gray-400">[API] POST /api/simulate 200 OK</div>
              <div className="text-green-400">[SYS] Telemetry stream nominal</div>
              <div className="text-blue-400 opacity-50">[INF] Awaiting next weather epoch...</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default System;
