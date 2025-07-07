import React, { useState } from 'react';
import { Package, TrendingUp, TrendingDown, Edit3, AlertCircle } from 'lucide-react';
import { Product, InventoryUpdate } from '../types';

interface InventoryManagementProps {
  products: Product[];
  inventoryUpdates: InventoryUpdate[];
  onUpdateInventory: (productId: string, newStock: number, reason: string) => void;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({
  products,
  inventoryUpdates,
  onUpdateInventory
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [stockAdjustment, setStockAdjustment] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('');

  const handleStockUpdate = () => {
    if (selectedProduct && stockAdjustment !== 0) {
      const product = products.find(p => p.id === selectedProduct);
      if (product) {
        const newStock = Math.max(0, product.stock + stockAdjustment);
        onUpdateInventory(selectedProduct, newStock, adjustmentReason || 'Manual adjustment');
        setStockAdjustment(0);
        setAdjustmentReason('');
      }
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-700 bg-red-50 border-red-200', label: 'Out of Stock', icon: <AlertCircle className="w-3 h-3" /> };
    if (stock < 10) return { color: 'text-amber-700 bg-amber-50 border-amber-200', label: 'Critical', icon: <AlertCircle className="w-3 h-3" /> };
    if (stock < 20) return { color: 'text-yellow-700 bg-yellow-50 border-yellow-200', label: 'Low Stock', icon: <AlertCircle className="w-3 h-3" /> };
    return { color: 'text-green-700 bg-green-50 border-green-200', label: 'In Stock', icon: <Package className="w-3 h-3" /> };
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center">
          <Package className="w-4 h-4 mr-2 text-slate-600" />
          Inventory Management System
        </h3>
      </div>

      {/* Stock Update Form */}
      <div className="border-b border-slate-200 bg-slate-50 p-6">
        <h4 className="text-sm font-medium text-slate-900 mb-4 flex items-center">
          <Edit3 className="w-4 h-4 mr-2 text-slate-600" />
          Stock Adjustment
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (Current: {product.stock})
              </option>
            ))}
          </select>
          <input
            type="number"
            value={stockAdjustment}
            onChange={(e) => setStockAdjustment(parseInt(e.target.value) || 0)}
            placeholder="Adjustment (+/-)"
            className="border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            value={adjustmentReason}
            onChange={(e) => setAdjustmentReason(e.target.value)}
            placeholder="Reason for adjustment"
            className="border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
          />
          <button
            onClick={handleStockUpdate}
            disabled={!selectedProduct || stockAdjustment === 0}
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Update Stock
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Products Table */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-slate-900 mb-4">Product Inventory</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Stock Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {products.map(product => {
                  const status = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 object-cover border border-slate-200 mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-slate-900">{product.name}</div>
                            <div className="text-xs text-slate-500">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">{product.category}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">${product.price}</td>
                      <td className="px-4 py-3 text-sm font-bold text-slate-900">{product.stock} units</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border ${status.color}`}>
                          {status.icon}
                          <span className="ml-1">{status.label}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Updates */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-4">Recent Inventory Transactions</h4>
          <div className="border border-slate-200">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
              <div className="grid grid-cols-4 gap-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                <div>Product</div>
                <div>Change</div>
                <div>Reason</div>
                <div>Timestamp</div>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {inventoryUpdates.slice(0, 10).map((update, index) => {
                const product = products.find(p => p.id === update.productId);
                const isIncrease = update.newStock > update.oldStock;
                return (
                  <div key={index} className="px-4 py-3 border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="text-sm font-medium text-slate-900">{product?.name}</div>
                      <div className="flex items-center">
                        {isIncrease ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className="text-sm font-medium text-slate-900">
                          {update.oldStock} → {update.newStock}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">{update.reason}</div>
                      <div className="text-xs text-slate-500">{update.timestamp.toLocaleString()}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;