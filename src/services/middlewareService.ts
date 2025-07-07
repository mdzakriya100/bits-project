import { Product, Order, OrderStatus, InventoryUpdate } from '../types';
import { mockProducts, mockOrders } from '../data/mockData';

class MiddlewareService {
  private products: Product[] = [...mockProducts];
  private orders: Order[] = [...mockOrders];
  private inventoryUpdates: InventoryUpdate[] = [];
  private subscribers: { [key: string]: ((data: any) => void)[] } = {};

  // Event subscription system
  subscribe(event: string, callback: (data: any) => void) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  private emit(event: string, data: any) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(data));
    }
  }

  // Inventory Management
  updateInventory(productId: string, newStock: number, reason: string) {
    const productIndex = this.products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      const oldStock = this.products[productIndex].stock;
      this.products[productIndex].stock = newStock;
      
      const update: InventoryUpdate = {
        productId,
        oldStock,
        newStock,
        timestamp: new Date(),
        reason
      };
      
      this.inventoryUpdates.unshift(update);
      this.emit('inventory-updated', { product: this.products[productIndex], update });
      this.emit('ecommerce-sync', { type: 'inventory', product: this.products[productIndex] });
    }
  }

  getProducts(): Product[] {
    return this.products;
  }

  getInventoryUpdates(): InventoryUpdate[] {
    return this.inventoryUpdates;
  }

  // Order Processing
  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.unshift(newOrder);
    this.emit('order-created', newOrder);
    this.emit('order-processing', newOrder);
    
    // Update inventory for ordered products
    newOrder.products.forEach(item => {
      const product = this.products.find(p => p.id === item.productId);
      if (product && product.stock >= item.quantity) {
        this.updateInventory(item.productId, product.stock - item.quantity, `Order ${newOrder.id}`);
      }
    });

    return newOrder;
  }

  updateOrderStatus(orderId: string, status: OrderStatus) {
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = status;
      this.orders[orderIndex].updatedAt = new Date();
      
      this.emit('order-status-updated', this.orders[orderIndex]);
      this.emit('ecommerce-sync', { type: 'order', order: this.orders[orderIndex] });
    }
  }

  getOrders(): Order[] {
    return this.orders;
  }

  // Analytics
  getSystemMetrics() {
    const totalProducts = this.products.length;
    const totalOrders = this.orders.length;
    const pendingOrders = this.orders.filter(o => o.status === OrderStatus.PENDING).length;
    const lowStockProducts = this.products.filter(p => p.stock < 20).length;
    const totalRevenue = this.orders.reduce((sum, order) => sum + order.total, 0);

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      lowStockProducts,
      totalRevenue
    };
  }
}

export const middlewareService = new MiddlewareService();