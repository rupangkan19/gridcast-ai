import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, GitMerge, CheckSquare, Lightbulb, Settings, Zap } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Exploration', path: '/exploration', icon: Compass },
    { name: 'Decisions', path: '/decisions', icon: GitMerge },
    { name: 'Validation', path: '/validation', icon: CheckSquare },
    { name: 'Insights', path: '/insights', icon: Lightbulb },
    { name: 'System', path: '/system', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white dark:bg-card-dark border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-300">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
        <span className="text-xl font-bold tracking-tight">GRIDCAST</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          System Operational
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
