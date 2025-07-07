import { Product, Order, OrderStatus, SystemStatus } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 129.99,
    stock: 45,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299.99,
    stock: 23,
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitoring',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Organic Coffee Beans',
    price: 24.99,
    stock: 78,
    category: 'Food',
    description: 'Premium organic coffee beans from Colombia',
    image: 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    stock: 12,
    category: 'Furniture',
    description: 'Comfortable ergonomic chair for long work sessions',
    image: 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    price: 39.99,
    stock: 156,
    category: 'Lifestyle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    image: 'https://images.pexels.com/photos/3740423/pexels-photo-3740423.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '6',
    name: 'Wireless Gaming Mouse',
    price: 89.99,
    stock: 67,
    category: 'Electronics',
    description: 'High-precision wireless gaming mouse with RGB lighting',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '7',
    name: 'Mechanical Keyboard',
    price: 159.99,
    stock: 34,
    category: 'Electronics',
    description: 'Premium mechanical keyboard with tactile switches',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '8',
    name: 'Smartphone Stand',
    price: 19.99,
    stock: 89,
    category: 'Accessories',
    description: 'Adjustable aluminum smartphone stand for desk',
    image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '9',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    stock: 56,
    category: 'Electronics',
    description: 'Waterproof portable speaker with 12-hour battery life',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '10',
    name: 'USB-C Hub',
    price: 49.99,
    stock: 43,
    category: 'Electronics',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card slots',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '11',
    name: 'Wireless Charging Pad',
    price: 34.99,
    stock: 72,
    category: 'Electronics',
    description: 'Fast wireless charging pad compatible with all Qi devices',
    image: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '12',
    name: 'LED Desk Lamp',
    price: 69.99,
    stock: 38,
    category: 'Furniture',
    description: 'Adjustable LED desk lamp with touch controls and USB charging',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'John Smith',
    products: [
      { productId: '1', productName: 'Wireless Bluetooth Headphones', quantity: 2, price: 129.99 },
      { productId: '3', productName: 'Organic Coffee Beans', quantity: 1, price: 24.99 }
    ],
    total: 284.97,
    status: OrderStatus.PROCESSING,
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T11:45:00')
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Sarah Johnson',
    products: [
      { productId: '2', productName: 'Smart Fitness Watch', quantity: 1, price: 299.99 }
    ],
    total: 299.99,
    status: OrderStatus.SHIPPED,
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-15T09:15:00')
  },
  {
    id: 'ORD-003',
    customerId: 'CUST-003',
    customerName: 'Michael Brown',
    products: [
      { productId: '4', productName: 'Ergonomic Office Chair', quantity: 1, price: 449.99 },
      { productId: '5', productName: 'Stainless Steel Water Bottle', quantity: 3, price: 39.99 }
    ],
    total: 569.96,
    status: OrderStatus.PENDING,
    createdAt: new Date('2024-01-15T16:45:00'),
    updatedAt: new Date('2024-01-15T16:45:00')
  }
];

export const mockSystemStatus: SystemStatus[] = [
  {
    name: 'Inventory Management',
    status: 'online',
    lastUpdate: new Date(),
    responseTime: 45
  },
  {
    name: 'Order Processing',
    status: 'online',
    lastUpdate: new Date(),
    responseTime: 32
  },
  {
    name: 'E-commerce Platform',
    status: 'online',
    lastUpdate: new Date(),
    responseTime: 28
  },
  {
    name: 'EAI Middleware',
    status: 'online',
    lastUpdate: new Date(),
    responseTime: 15
  }
];