import React, { useState } from 'react';
import { ShoppingBag, Star, Truck, Shield, Clock, ArrowRight, Package, Users, Award, LogIn, Search, Plus, Minus, X, CreditCard, MapPin, User, Mail, Phone } from 'lucide-react';
import { Product, OrderItem } from '../types';

interface EcommerceLandingPageProps {
  products: Product[];
  onNavigateToShop: () => void;
  onLoginClick: () => void;
}

interface CartItem extends OrderItem {
  image: string;
}

const EcommerceLandingPage: React.FC<EcommerceLandingPageProps> = ({ 
  products, 
  onNavigateToShop, 
  onLoginClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  // Checkout form data
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        price: product.price,
        image: product.image
      }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.productId !== productId));
    } else {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
    setCheckoutStep(1);
  };

  const handleNextStep = () => {
    if (checkoutStep < 3) {
      setCheckoutStep(checkoutStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(checkoutStep - 1);
    }
  };

  const handleCompleteOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      setCart([]);
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
      });
    }, 2000);
  };

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">TechMart</h1>
                <p className="text-xs text-slate-500">Premium Electronics & More</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={onNavigateToShop}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                Shop Now
              </button>
              <button
                onClick={onLoginClick}
                className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Premium Electronics
                <span className="text-blue-600 block">Delivered Fast</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Discover our curated collection of high-quality electronics, from cutting-edge headphones to smart fitness devices. Experience excellence in every product.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onNavigateToShop}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                  View Catalog
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Premium Headphones"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-slate-900">Featured Product</h3>
                  <p className="text-slate-600">Wireless Bluetooth Headphones</p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-slate-600 ml-2 text-sm">(4.9)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Products</h2>
            <p className="text-xl text-slate-600">
              Browse our complete collection of premium electronics and accessories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-slate-900">
                    ${product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-slate-600 ml-2 text-sm">(4.8)</span>
                    </div>
                    <span className="text-sm text-slate-500">{product.stock} in stock</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose TechMart?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service and premium products that exceed your expectations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Fast Delivery</h3>
              <p className="text-slate-600">
                Free shipping on orders over $50. Get your products delivered within 2-3 business days.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Secure Shopping</h3>
              <p className="text-slate-600">
                Your data is protected with enterprise-grade security. Shop with confidence and peace of mind.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">24/7 Support</h3>
              <p className="text-slate-600">
                Our customer support team is available around the clock to help with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-slate-400">Products Sold</div>
            </div>
            <div>
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">5,000+</div>
              <div className="text-slate-400">Happy Customers</div>
            </div>
            <div>
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-slate-400">Satisfaction Rate</div>
            </div>
            <div>
              <div className="bg-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-slate-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 rounded-lg p-2">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TechMart</span>
              </div>
              <p className="text-slate-400">
                Your trusted partner for premium electronics and exceptional customer service.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Social Media</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 TechMart. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{item.productName}</h3>
                        <p className="text-slate-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total: ${getTotalAmount().toFixed(2)}</span>
                  <span className="text-slate-600">{getTotalItems()} items</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && !orderComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center justify-center space-x-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= checkoutStep ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {step}
                    </div>
                    <span className={`ml-2 text-sm ${
                      step <= checkoutStep ? 'text-blue-600 font-medium' : 'text-slate-600'
                    }`}>
                      {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Step 1: Shipping Information */}
              {checkoutStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={customerInfo.zipCode}
                        onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {checkoutStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={customerInfo.cardNumber}
                        onChange={(e) => setCustomerInfo({...customerInfo, cardNumber: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={customerInfo.expiryDate}
                        onChange={(e) => setCustomerInfo({...customerInfo, expiryDate: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                      <input
                        type="text"
                        value={customerInfo.cvv}
                        onChange={(e) => setCustomerInfo({...customerInfo, cvv: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={customerInfo.cardName}
                        onChange={(e) => setCustomerInfo({...customerInfo, cardName: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {checkoutStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900">Order Review</h3>
                  
                  {/* Order Items */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.productId} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img src={item.image} alt={item.productName} className="w-12 h-12 object-cover rounded" />
                            <div>
                              <p className="font-medium text-slate-900">{item.productName}</p>
                              <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-200 mt-4 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total: ${getTotalAmount().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-2">Shipping Address</h4>
                    <p className="text-slate-600">
                      {customerInfo.name}<br />
                      {customerInfo.address}<br />
                      {customerInfo.city}, {customerInfo.zipCode}<br />
                      {customerInfo.phone}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-2">Payment Method</h4>
                    <p className="text-slate-600">
                      **** **** **** {customerInfo.cardNumber.slice(-4)}<br />
                      {customerInfo.cardName}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Checkout Actions */}
            <div className="border-t border-slate-200 p-6">
              <div className="flex items-center justify-between">
                {checkoutStep > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <div className="flex-1"></div>
                {checkoutStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteOrder}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Complete Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Complete Modal */}
      {orderComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Complete!</h3>
            <p className="text-slate-600 mb-6">
              Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
            <button
              onClick={() => {
                setOrderComplete(false);
                setShowCheckout(false);
              }}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceLandingPage;