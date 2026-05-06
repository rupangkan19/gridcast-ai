import React, { createContext, useContext, useState, useEffect } from 'react';

const ForecastContext = createContext();

export const useForecast = () => useContext(ForecastContext);

export const ForecastProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState('Bangalore');
  const [selectedHour, setSelectedHour] = useState(12); // Default noon
  const [forecastData, setForecastData] = useState(null);
  const [explanations, setExplanations] = useState(null);
  const [criticalMoments, setCriticalMoments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Theme support
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Fetch data when region changes
  useEffect(() => {
    const fetchForecast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fallback to local API or production Render API
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${baseUrl}/api/forecast/${selectedRegion}`);
        if (!response.ok) throw new Error('Failed to fetch forecast');
        const data = await response.json();
        
        setForecastData(data.forecasts);
        setExplanations(data.explanations);
        setCriticalMoments(data.critical_moments);
      } catch (err) {
        setError(err.message);
        // Fallback to dummy data for UI testing if API fails
        console.warn("API failed, using fallback data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecast();
  }, [selectedRegion]);

  const value = {
    selectedRegion, setSelectedRegion,
    selectedHour, setSelectedHour,
    forecastData, explanations, criticalMoments,
    isLoading, error,
    darkMode, toggleDarkMode
  };

  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
};
