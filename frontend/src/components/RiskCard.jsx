import React from 'react';
import { ShieldAlert, AlertCircle, CheckCircle } from 'lucide-react';

const RiskCard = ({ risk }) => {
  
  const getRiskStyles = () => {
    switch(risk) {
      case 'High': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400';
      case 'Medium': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400';
      default: return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400';
    }
  };

  const getRiskIcon = () => {
    switch(risk) {
      case 'High': return <ShieldAlert className="h-8 w-8 mb-3" />;
      case 'Medium': return <AlertCircle className="h-8 w-8 mb-3" />;
      default: return <CheckCircle className="h-8 w-8 mb-3" />;
    }
  };

  return (
    <div className={`rounded-xl p-5 border shadow-sm ${getRiskStyles()}`}>
      {getRiskIcon()}
      <h3 className="font-semibold text-lg mb-1">Risk Level: {risk}</h3>
      <p className="text-sm opacity-80">
        {risk === 'High' ? 'High uncertainty spread. Grid instability likely without backup.' : 
         risk === 'Medium' ? 'Moderate uncertainty. Monitor weather patterns closely.' :
         'Low uncertainty. Stable generation expected.'}
      </p>
    </div>
  );
};

export default RiskCard;
