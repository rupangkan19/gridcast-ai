import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { BellRing } from 'lucide-react';

const AlertsPanel = ({ hour }) => {
  const { criticalMoments } = useForecast();

  if (!criticalMoments || criticalMoments.length === 0) {
    return (
      <div className="bg-white dark:bg-card-dark rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm h-full">
        <h3 className="font-semibold text-lg mb-4">Critical Moments</h3>
        <p className="text-sm text-gray-500">No critical moments detected for today.</p>
      </div>
    );
  }

  // Find alerts close to the current hour (within 2 hours)
  const relevantAlerts = criticalMoments.filter(m => Math.abs(m.hour - hour) <= 2);

  return (
    <div className="bg-white dark:bg-card-dark rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Critical Alerts</h3>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
          {criticalMoments.length}
        </span>
      </div>

      <div className="space-y-3">
        {relevantAlerts.length > 0 ? (
          relevantAlerts.map((alert, idx) => (
            <div key={idx} className="flex items-start p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800/30">
              <BellRing className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 dark:text-red-300">{alert.type} at {alert.hour}:00</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{alert.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No critical alerts near selected time. Scroll timeline to view others.</p>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;
