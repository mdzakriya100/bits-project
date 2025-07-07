import React, { useState } from 'react';
import { Store, ShoppingBag, Plus, Minus, CreditCard } from 'lucide-react';
import { Product, OrderItem } from '../types';

interface EcommercePlatformProps {
  products: Product[];
  onCreateOrder: (customerName: string, items: OrderItem[]) => void;
}

const EcommercePlatform: React.FC<EcommercePlatformProps> = ({ products, onCreateOrder }) => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.productId === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price
      }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (customerName && cart.length > 0) {
      onCreateOrder(customerName, cart);
      setCart([]);
      setCustomerName('');
      setShowCheckout(false);
    }
  };

  const availableProducts = products.filter(product => product.stock > 0);

  return (
    <div className="bg-white border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center">
          <Store className="w-4 h-4 mr-2 text-slate-600" />
          E-Commerce Platform Interface
        </h3>
      </div>

      {/* Shopping Cart */}
      <div className="border-b border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-slate-900 flex items-center">
            <ShoppingBag className="w-4 h-4 mr-2 text-slate-600" />
            Shopping Cart ({cart.length} items)
          </h4>
          <button
            onClick={() => setShowCheckout(!showCheckout)}
            disabled={cart.length === 0}
            className="bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Proceed to Checkout
          </button>
        </div>

        {cart.length > 0 && (
          <div className="border border-slate-200 bg-white">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
              <div className="grid grid-cols-6 gap-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
                <div>Action</div>
              </div>
            </div>
            {cart.map(item => (
              <div key={item.productId} className="px-4 py-3 border-b border-slate-200 last:border-b-0">
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="col-span-2 text-sm font-medium text-slate-900">{item.productName}</div>
                  <div className="text-sm text-slate-900">${item.price.toFixed(2)}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 text-sm"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-6 h-6 bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 text-sm"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-sm font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-900">Total Amount:</span>
                <span className="text-lg font-bold text-slate-900">${getTotalAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {showCheckout && (
          <div className="mt-4 border border-slate-200 bg-white p-4">
            <h5 className="text-sm font-medium text-slate-900 mb-3">Customer Information</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className="border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleCheckout}
                disabled={!customerName || cart.length === 0}
                className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Complete Order
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Product Catalog */}
        <h4 className="text-sm font-medium text-slate-900 mb-4">Product Catalog</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {availableProducts.map(product => (
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
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{product.stock} units</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EcommercePlatform;