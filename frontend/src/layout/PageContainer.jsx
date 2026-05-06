import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-bg-dark transition-colors duration-300 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {children}
      </div>
    </main>
  );
};

export default PageContainer;
