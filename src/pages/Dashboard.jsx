import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { ordersAPI } from '../services/orders';
import { ORDER_STATUS, ORDER_STATUS_COLORS } from '../config/constants';
import { Package, User, MapPin, Phone, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();

  // Redirect admin to admin panel
  if (isAdmin) return <Navigate to="/admin/dashboard" replace />;
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getUserOrders();
      setOrders(response.data || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen pb-12 pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Loader size="lg" text="Loading your orders..." />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-12 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-gray-400 text-xs flex items-center gap-2 mb-8 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-gray-600">&gt;</span>
          <span className="text-white">My Account</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: User Info */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#111] border border-white/5 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#ff4700] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">{user?.name || 'User'}</h2>
                  <p className="text-gray-500 text-sm">{user?.email || ''}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{user?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Pakistan</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date().getFullYear()}</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full mt-6 py-3 border border-red-500/50 text-red-400 font-bold rounded-lg hover:bg-red-500/10 transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-[#111] border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-4">
                QUICK LINKS
              </h3>
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-between p-3 rounded-lg bg-primary/20 text-primary border border-primary/30"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-medium">My Orders</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop"
                  className="flex items-center justify-between p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    <span className="font-medium">Shop Now</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center justify-between p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-medium">My Cart</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Orders */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">
              MY ORDERS
            </h1>

            {orders.length === 0 ? (
              <EmptyState
                type="orders"
                message="You haven't placed any orders yet"
                actionText="Start Shopping"
                onAction={() => window.location.href = '/shop'}
              />
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-[#111] border border-white/5 rounded-xl p-6">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-bold">Order #{order.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${ORDER_STATUS_COLORS[order.status] || ORDER_STATUS_COLORS.pending}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">Rs. {order.total?.toLocaleString() || '0'}</p>
                        <p className="text-gray-500 text-xs">{order.items?.length || 0} items</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#111b21] rounded-lg p-2 flex-shrink-0 flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white text-xs font-bold line-clamp-1">{item.name}</h4>
                            <p className="text-gray-500 text-[10px]">Qty: {item.quantity} × Rs. {item.price?.toLocaleString() || '0'}</p>
                          </div>
                          <p className="text-white text-xs font-bold">Rs. {(item.quantity * item.price)?.toLocaleString() || '0'}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-white/5">
                      <div className="text-gray-400 text-xs">
                        <p>Payment: Cash on Delivery</p>
                        <p>Delivery: {order.address || 'N/A'}</p>
                      </div>
                      <Link
                        to={`/order/${order.id}`}
                        className="text-primary text-xs font-bold hover:underline flex items-center gap-1"
                      >
                        View Details
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
