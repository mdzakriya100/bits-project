import React, { useState } from 'react';
import { ShoppingCart, Clock, Truck, CheckCircle, XCircle, FileText } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderProcessingProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderProcessing: React.FC<OrderProcessingProps> = ({ orders, onUpdateOrderStatus }) => {
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [newStatus, setNewStatus] = useState<OrderStatus>(OrderStatus.PENDING);

  const handleStatusUpdate = () => {
    if (selectedOrder && newStatus) {
      onUpdateOrderStatus(selectedOrder, newStatus);
      setSelectedOrder('');
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Clock className="w-4 h-4 text-amber-600" />;
      case OrderStatus.PROCESSING:
        return <ShoppingCart className="w-4 h-4 text-blue-600" />;
      case OrderStatus.SHIPPED:
        return <Truck className="w-4 h-4 text-purple-600" />;
      case OrderStatus.DELIVERED:
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case OrderStatus.CANCELLED:
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case OrderStatus.PROCESSING:
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case OrderStatus.SHIPPED:
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case OrderStatus.DELIVERED:
        return 'text-green-700 bg-green-50 border-green-200';
      case OrderStatus.CANCELLED:
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const sortedOrders = [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="bg-white border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center">
          <FileText className="w-4 h-4 mr-2 text-slate-600" />
          Order Processing System
        </h3>
      </div>

      {/* Order Status Update */}
      <div className="border-b border-slate-200 bg-slate-50 p-6">
        <h4 className="text-sm font-medium text-slate-900 mb-4">Order Status Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
          >
            <option value="">Select Order</option>
            {orders.map(order => (
              <option key={order.id} value={order.id}>
                {order.id} - {order.customerName} (${order.total.toFixed(2)})
              </option>
            ))}
          </select>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
            className="border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={OrderStatus.PENDING}>Pending</option>
            <option value={OrderStatus.PROCESSING}>Processing</option>
            <option value={OrderStatus.SHIPPED}>Shipped</option>
            <option value={OrderStatus.DELIVERED}>Delivered</option>
            <option value={OrderStatus.CANCELLED}>Cancelled</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={!selectedOrder}
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Update Status
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Created</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Updated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {sortedOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-slate-900">{order.id}</div>
                    <div className="text-xs text-slate-500">{order.customerId}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{order.customerName}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-slate-900">
                      {order.products.map((item, index) => (
                        <div key={index} className="text-xs text-slate-600">
                          {item.productName} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-slate-900">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status.toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{order.createdAt.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{order.updatedAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;