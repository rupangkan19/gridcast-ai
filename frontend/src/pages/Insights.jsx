import React from 'react';

const Insights = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
      <p className="text-gray-500 mt-1">Detailed operational insights.</p>
    </div>
    <div className="bg-white dark:bg-card-dark rounded-xl p-12 border border-gray-200 dark:border-gray-800 flex items-center justify-center shadow-sm">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-400 mb-2">Coming Soon</h2>
        <p className="text-gray-500">This module is under development.</p>
      </div>
    </div>
  </div>
);

export default Insights;
