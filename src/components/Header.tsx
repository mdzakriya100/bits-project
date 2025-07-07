import React from 'react';
import { Network, Activity, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  showAdminFeatures: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, showAdminFeatures }) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 shadow-sm">
      <div className="max-w-full mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 rounded p-1.5">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {showAdminFeatures ? 'Enterprise Integration Platform' : 'TechMart Shopping'}
              </h1>
              <p className="text-xs text-slate-300">
                {showAdminFeatures ? 'Application Integration Middleware v2.1' : 'Premium Electronics & More'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {showAdminFeatures && (
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-slate-200">System Operational</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {showAdminFeatures && (
                <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;