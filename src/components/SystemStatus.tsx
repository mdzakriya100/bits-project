import React from 'react';
import { Activity, CheckCircle, AlertCircle, XCircle, Server } from 'lucide-react';
import { SystemStatus as SystemStatusType } from '../types';

interface SystemStatusProps {
  systems: SystemStatusType[];
}

const SystemStatus: React.FC<SystemStatusProps> = ({ systems }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'maintenance':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'maintenance':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'offline':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center">
          <Server className="w-4 h-4 mr-2 text-slate-600" />
          System Health Monitor
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systems.map((system, index) => (
            <div key={index} className="border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(system.status)}
                  <h4 className="font-medium text-slate-900 text-sm">{system.name}</h4>
                </div>
                <span className={`px-2 py-1 text-xs font-medium border rounded ${getStatusColor(system.status)}`}>
                  {system.status.toUpperCase()}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Response Time:</span>
                  <span className="font-medium text-slate-700">{system.responseTime}ms</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Last Check:</span>
                  <span className="font-medium text-slate-700">{system.lastUpdate.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;