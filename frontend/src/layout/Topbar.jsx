import React, { useState, useRef, useEffect } from 'react';
import { useForecast } from '../context/ForecastContext';
import { Moon, Sun, Bell, Search, MapPin, Calendar, Clock, User, LogOut, Settings } from 'lucide-react';
import { renewableAssets } from '../data/assets';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { 
    darkMode, toggleDarkMode, 
    selectedAsset, setSelectedAsset,
    selectedDate, setSelectedDate,
    selectedHour, setSelectedHour
  } = useForecast();

  const navigate = useNavigate();
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // State for search and profile
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const pages = [
    { name: 'Dashboard', path: '/' },
    { name: 'Decisions', path: '/decisions' },
    { name: 'Exploration', path: '/exploration' },
    { name: 'Insights', path: '/insights' },
    { name: 'System', path: '/system' },
    { name: 'Validation', path: '/validation' }
  ];

  const filteredPages = pages.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearchDropdown(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchNav = (path) => {
    navigate(path);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  return (
    <header className="h-16 bg-white dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 transition-colors duration-300 relative z-50">
      
      {/* Left side: Context selector */}
      <div className="flex items-center space-x-4">
        {/* Asset Selector */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-gray-400" />
          </div>
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="pl-9 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 appearance-none max-w-[200px] truncate"
          >
            {renewableAssets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
        </div>

        {/* Date Selector */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
          />
        </div>

        {/* Time Selector */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(parseInt(e.target.value))}
            className="pl-9 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            {hours.map(h => (
              <option key={h} value={h}>{h.toString().padStart(2, '0')}:00</option>
            ))}
          </select>
        </div>
      </div>

      {/* Right side: Tools */}
      <div className="flex items-center space-x-4">
        
        {/* Search */}
        <div className="relative" ref={searchRef}>
          <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search pages..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSearchDropdown(true); }}
              onFocus={() => setShowSearchDropdown(true)}
              className="bg-transparent border-none focus:outline-none text-sm w-40 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          
          {showSearchDropdown && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
              {filteredPages.length > 0 ? (
                filteredPages.map(page => (
                  <button
                    key={page.path}
                    onClick={() => handleSearchNav(page.path)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {page.name}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No pages found</div>
              )}
            </div>
          )}
        </div>
        
        <button 
          onClick={() => alert("No new notifications")}
          className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-card-dark"></span>
        </button>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="h-9 w-9 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow flex items-center justify-center text-gray-500 hover:shadow-md transition-shadow overflow-hidden focus:outline-none"
          >
             {/* Empty profile photo, just shadows as requested */}
             <User className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Admin</p>
                <p className="text-xs text-gray-500 truncate flex items-center mt-0.5"><MapPin className="w-3 h-3 mr-1" /> Karnataka, India</p>
              </div>
              <div className="py-1">
                <button 
                  onClick={() => { navigate('/profile'); setShowProfileDropdown(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
                >
                  <User className="w-4 h-4 mr-2 text-gray-400" /> My Profile
                </button>
                <button 
                  onClick={() => { navigate('/profile'); setShowProfileDropdown(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
                >
                  <Settings className="w-4 h-4 mr-2 text-gray-400" /> Account Settings
                </button>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                <button 
                  onClick={() => { navigate('/'); setShowProfileDropdown(false); alert('Signed out successfully. Returning to dashboard.'); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;
