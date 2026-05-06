import React from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const ForecastChart = ({ data, selectedHour }) => {
  if (!data || data.length === 0) return null;

  const assetType = data[0].asset_type;
  const showSolar = assetType === 'solar' || assetType === 'hybrid';
  const showWind = assetType === 'wind' || assetType === 'hybrid';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-700" />
        <XAxis 
          dataKey="hour" 
          tickFormatter={(tick) => `${tick}:00`} 
          stroke="#9CA3AF" 
          tick={{fontSize: 12}}
        />
        <YAxis stroke="#9CA3AF" tick={{fontSize: 12}} />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          labelFormatter={(label) => `Time: ${label}:00`}
        />
        
        {/* Uncertainty Band (P10 to P90) */}
        <Area 
          type="monotone" 
          dataKey="total.p90" 
          stroke="none" 
          fill="#DBEAFE" 
          fillOpacity={0.5} 
          className="dark:fill-blue-900"
        />
        <Area 
          type="monotone" 
          dataKey="total.p10" 
          stroke="none" 
          fill="#FFFFFF" 
          fillOpacity={1}
          className="dark:fill-card-dark"
        />

        {showSolar && (
          <Line 
            type="monotone" 
            dataKey="solar.p50" 
            stroke="#FBBF24" 
            strokeWidth={2} 
            dot={false}
            name="Solar"
          />
        )}

        {showWind && (
          <Line 
            type="monotone" 
            dataKey="wind.p50" 
            stroke="#60A5FA" 
            strokeWidth={2} 
            dot={false}
            name="Wind"
          />
        )}

        {/* P50 Expected Generation (Total) */}
        <Line 
          type="monotone" 
          dataKey="total.p50" 
          stroke="#2563EB" 
          strokeWidth={3} 
          dot={false}
          activeDot={{ r: 6, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }}
          name="Total Forecast"
        />

        {/* Selected Hour Reference */}
        {selectedHour !== undefined && (
          <ReferenceLine x={selectedHour} stroke="#F59E0B" strokeDasharray="3 3" />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ForecastChart;
