import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ForecastProvider } from './context/ForecastContext';

// Layout
import Sidebar from './layout/Sidebar';
import Topbar from './layout/Topbar';
import PageContainer from './layout/PageContainer';

// Pages
import Dashboard from './pages/Dashboard';
import Exploration from './pages/Exploration';
import Decisions from './pages/Decisions';
import Validation from './pages/Validation';
import Insights from './pages/Insights';
import System from './pages/System';

function App() {
  return (
    <ForecastProvider>
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Topbar />
            <PageContainer>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exploration" element={<Exploration />} />
                <Route path="/decisions" element={<Decisions />} />
                <Route path="/validation" element={<Validation />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/system" element={<System />} />
              </Routes>
            </PageContainer>
          </div>
        </div>
      </BrowserRouter>
    </ForecastProvider>
  );
}

export default App;
