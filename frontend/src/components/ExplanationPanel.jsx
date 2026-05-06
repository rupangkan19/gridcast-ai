import React from 'react';
import { useForecast } from '../context/ForecastContext';
import { Lightbulb } from 'lucide-react';

const ExplanationPanel = ({ hour }) => {
  const { explanations } = useForecast();

  if (!explanations) return null;

  const currentExplanation = explanations.find(e => e.hour === hour) || explanations[0];

  return (
    <div className="flex items-start">
      <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full mr-4">
        <Lightbulb className="text-blue-600 dark:text-blue-400 h-6 w-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">Operational Context</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {currentExplanation.story}
        </p>
      </div>
    </div>
  );
};

export default ExplanationPanel;
