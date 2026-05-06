import React from 'react';
import { useForecast } from '../context/ForecastContext';

const Validation = () => {
  const { forecastData } = useForecast();

  if (!forecastData) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Validation & Analysis</h1>
        <p className="text-gray-500 mt-1">Detailed tabular data and model baseline comparisons.</p>
      </div>

      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Hour</th>
                <th className="px-6 py-4 font-semibold">Risk Level</th>
                <th className="px-6 py-4 font-semibold">Total P10</th>
                <th className="px-6 py-4 font-semibold">Total P50</th>
                <th className="px-6 py-4 font-semibold">Total P90</th>
                <th className="px-6 py-4 font-semibold">Solar P50</th>
                <th className="px-6 py-4 font-semibold">Wind P50</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {forecastData.map((row) => (
                <tr key={row.hour} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{row.hour}:00</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.risk === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      row.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-red-600 dark:text-red-400">{row.total.p10}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{row.total.p50}</td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400">{row.total.p90}</td>
                  <td className="px-6 py-4 text-yellow-600 dark:text-yellow-400">{row.solar.p50}</td>
                  <td className="px-6 py-4 text-blue-600 dark:text-blue-400">{row.wind.p50}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Validation;
