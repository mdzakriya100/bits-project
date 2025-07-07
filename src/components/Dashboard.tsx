import React from 'react';
import { BarChart3, DollarSign, Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

interface DashboardProps {
  metrics: {
    totalProducts: number;
    totalOrders: number;
    pendingOrders: number;
    lowStockProducts: number;
    totalRevenue: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
  const stats = [
    {
      icon: <Package className="w-5 h-5 text-slate-600" />,
      label: 'Total Products',
      value: metrics.totalProducts.toLocaleString(),
      change: '+2.5%',
      changeType: 'positive',
      color: 'border-l-blue-500'
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-slate-600" />,
      label: 'Total Orders',
      value: metrics.totalOrders.toLocaleString(),
      change: '+12.3%',
      changeType: 'positive',
      color: 'border-l-green-500'
    },
    {
      icon: <DollarSign className="w-5 h-5 text-slate-600" />,
      label: 'Revenue (YTD)',
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      change: '+8.7%',
      changeType: 'positive',
      color: 'border-l-emerald-500'
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-slate-600" />,
      label: 'Pending Orders',
      value: metrics.pendingOrders.toLocaleString(),
      change: '-5.2%',
      changeType: 'negative',
      color: 'border-l-amber-500'
    },
    {
      icon: <Package className="w-5 h-5 text-slate-600" />,
      label: 'Low Stock Items',
      value: metrics.lowStockProducts.toLocaleString(),
      change: '+1.8%',
      changeType: 'negative',
      color: 'border-l-red-500'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center">
          <BarChart3 className="w-4 h-4 mr-2 text-slate-600" />
          Executive Dashboard
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white border border-slate-200 ${stat.color} border-l-4 p-4 hover:shadow-sm transition-shadow`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {stat.icon}
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide ml-2">{stat.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <div className="flex items-center">
                    <TrendingUp className={`w-3 h-3 mr-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">vs last month</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;