import React from 'react';
import { User, MapPin, Mail, Building, Key, Activity, Shield, Clock } from 'lucide-react';

const Profile = () => {
  return (
    <div className="animate-in fade-in duration-700 pb-12 max-w-4xl mx-auto">
      
      {/* Profile Header */}
      <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-8 pb-8 flex flex-col md:flex-row md:items-end -mt-12 relative z-10">
          <div className="h-24 w-24 rounded-full bg-white dark:bg-card-dark border-4 border-white dark:border-card-dark shadow-md flex items-center justify-center">
            {/* Empty profile photo, just shadows as requested */}
            <User className="h-10 w-10 text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin</h1>
            <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" /> Karnataka, India
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <button 
              onClick={() => alert("Profile details saved successfully.")}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Personal Info */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-6 flex items-center">
              <User className="w-4 h-4 mr-2" /> Personal Information
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" defaultValue="System" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" defaultValue="Admin" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input type="email" defaultValue="admin@gridcast.ai" className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Organization</label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input type="text" defaultValue="Grid Operations Control" disabled className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 cursor-not-allowed" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-6 flex items-center">
              <Key className="w-4 h-4 mr-2" /> Security
            </h3>
            
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Password</div>
                <div className="text-sm text-gray-500 mt-1">Last changed 45 days ago</div>
              </div>
              <button onClick={() => alert("Password reset link sent to your email.")} className="px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium transition-colors">
                Change
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</div>
                <div className="text-sm text-gray-500 mt-1">Secure your account with 2FA</div>
              </div>
              <button onClick={() => alert("2FA Setup initiated.")} className="px-4 py-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800 rounded-lg text-sm font-medium transition-colors">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Roles & Activity */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-6 flex items-center">
              <Shield className="w-4 h-4 mr-2" /> Access Roles
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Super Admin</div>
                  <div className="text-xs text-gray-500">Full system access</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Grid Dispatcher</div>
                  <div className="text-xs text-gray-500">Operational control access</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-wider uppercase text-gray-500 mb-6 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> Recent Sessions
            </h3>
            <div className="space-y-4">
              <div className="relative pl-4 border-l-2 border-green-500">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-green-500"></div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">MacBook Pro - Chrome</div>
                <div className="text-xs text-gray-500 mt-0.5">Bangalore, IN • Active Now</div>
              </div>
              <div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">iPhone 14 - Safari</div>
                <div className="text-xs text-gray-500 mt-0.5">Bangalore, IN • Yesterday, 14:22</div>
              </div>
            </div>
            <button onClick={() => alert("All other sessions have been terminated.")} className="w-full mt-6 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
              Sign out all other sessions
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
