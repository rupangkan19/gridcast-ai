import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { Moon, Sun, Bell, Search, MapPin } from 'lucide-react';

const Topbar = () => {
  const { darkMode, toggleDarkMode, selectedRegion, setSelectedRegion } = useForecast();

  const regions = ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belagavi"];

  return (
    <header className="h-16 bg-white dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 transition-colors duration-300">
      
      {/* Left side: Context selector */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-gray-400" />
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="pl-9 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Right side: Tools */}
      <div className="flex items-center space-x-4">
        <div className="relative text-gray-400 hover:text-gray-500">
          <Search className="h-5 w-5" />
        </div>
        
        <button className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-card-dark"></span>
        </button>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
          OP
        </div>
      </div>
    </header>
  );
};

export default Topbar;
