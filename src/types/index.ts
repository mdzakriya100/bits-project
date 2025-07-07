export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface InventoryUpdate {
  productId: string;
  oldStock: number;
  newStock: number;
  timestamp: Date;
  reason: string;
}

export interface SystemStatus {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: Date;
  responseTime: number;
}