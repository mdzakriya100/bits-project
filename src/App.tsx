import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import EcommerceLandingPage from './components/EcommerceLandingPage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SystemStatus from './components/SystemStatus';
import InventoryManagement from './components/InventoryManagement';
import OrderProcessing from './components/OrderProcessing';
import EcommercePlatform from './components/EcommercePlatform';
import { middlewareService } from './services/middlewareService';
import { mockSystemStatus } from './data/mockData';
import { Product, Order, InventoryUpdate, OrderItem, OrderStatus } from './types';

type ViewType = 'login' | 'ecommerce-landing' | 'ecommerce-shop' | 'admin-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('ecommerce-landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventoryUpdates, setInventoryUpdates] = useState<InventoryUpdate[]>([]);
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Initialize data regardless of login status for e-commerce landing
    setProducts(middlewareService.getProducts());
    setOrders(middlewareService.getOrders());
    setInventoryUpdates(middlewareService.getInventoryUpdates());
    updateMetrics();

    // Subscribe to middleware events
    middlewareService.subscribe('inventory-updated', (data) => {
      setProducts(middlewareService.getProducts());
      setInventoryUpdates(middlewareService.getInventoryUpdates());
      updateMetrics();
    });

    middlewareService.subscribe('order-created', (order) => {
      setOrders(middlewareService.getOrders());
      updateMetrics();
    });

    middlewareService.subscribe('order-status-updated', (order) => {
      setOrders(middlewareService.getOrders());
      updateMetrics();
    });

    // Simulate periodic system updates
    const interval = setInterval(() => {
      updateMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateMetrics = () => {
    const newMetrics = middlewareService.getSystemMetrics();
    setMetrics(newMetrics);
  };

  const handleLogin = (adminAccess: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(adminAccess);
    if (adminAccess) {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('ecommerce-shop');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentView('ecommerce-landing');
  };

  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleNavigateToShop = () => {
    setCurrentView('ecommerce-shop');
  };

  const handleInventoryUpdate = (productId: string, newStock: number, reason: string) => {
    middlewareService.updateInventory(productId, newStock, reason);
  };

  const handleOrderStatusUpdate = (orderId: string, status: OrderStatus) => {
    middlewareService.updateOrderStatus(orderId, status);
  };

  const handleCreateOrder = (customerName: string, items: OrderItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    middlewareService.createOrder({
      customerId: `CUST-${Date.now()}`,
      customerName,
      products: items,
      total,
      status: OrderStatus.PENDING
    });
  };

  // Render based on current view
  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentView === 'ecommerce-landing') {
    return (
      <EcommerceLandingPage 
        products={products}
        onNavigateToShop={handleNavigateToShop}
        onLoginClick={handleLoginClick}
      />
    );
  }

  if (currentView === 'ecommerce-shop') {
    return (
      <div className="min-h-screen bg-slate-100">
        <Header onLogout={handleLogout} showAdminFeatures={false} />
        
        <main className="max-w-full mx-auto px-6 py-6">
          <div className="space-y-6">
            {/* E-commerce Platform */}
            <EcommercePlatform 
              products={products}
              onCreateOrder={handleCreateOrder}
            />
          </div>
        </main>
      </div>
    );
  }

  if (currentView === 'admin-dashboard') {
    return (
      <div className="min-h-screen bg-slate-100">
        <Header onLogout={handleLogout} showAdminFeatures={true} />
        
        <main className="max-w-full mx-auto px-6 py-6">
          <div className="space-y-6">
            {/* Dashboard Overview */}
            <Dashboard metrics={metrics} />
            
            {/* System Status */}
            <SystemStatus systems={mockSystemStatus} />
            
            {/* Main Content */}
            <div className="space-y-6">
              {/* Inventory Management */}
              <InventoryManagement 
                products={products}
                inventoryUpdates={inventoryUpdates}
                onUpdateInventory={handleInventoryUpdate}
              />
              
              {/* Order Processing */}
              <OrderProcessing 
                orders={orders}
                onUpdateOrderStatus={handleOrderStatusUpdate}
              />
              
              {/* E-commerce Platform */}
              <EcommercePlatform 
                products={products}
                onCreateOrder={handleCreateOrder}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}

export default App;