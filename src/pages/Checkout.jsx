import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { WHATSAPP_CONFIG } from '../config/whatsapp';
import { CITIES, DELIVERY_FEE } from '../config/constants';
import { ordersAPI } from '../services/orders';
import { ArrowLeft, ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones as HeadphonesIcon, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const inputCls = `w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm
  placeholder-gray-600 focus:outline-none focus:border-[#ff4700]/50 focus:ring-1
  focus:ring-[#ff4700]/20 transition-colors`;

const labelCls = `block text-gray-500 text-[11px] font-black uppercase tracking-widest mb-2`;

const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-3 mb-5">
    <h2 className="text-white font-black text-sm uppercase tracking-widest">{children}</h2>
    <div className="flex-1 h-px bg-white/5" />
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    phoneNumber:  user?.phone || '',
    address: '',
    city: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) { addToast('Your cart is empty', 'error'); navigate('/shop'); return; }
    if (!formData.customerName || !formData.phoneNumber || !formData.address || !formData.city) {
      addToast('Please fill in all required fields', 'error'); return;
    }
    setLoading(true);
    try {
      const orderPayload = {
        customerInfo: { fullName: formData.customerName, phone: formData.phoneNumber, city: formData.city, address: formData.address, notes: formData.notes },
        items: cart.map(i => ({ product: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        totalAmount: total,
        paymentMethod: 'COD',
      };
      let order = null;
      try { const res = await ordersAPI.create(orderPayload); order = res.order; } catch {}
      const waMessage = WHATSAPP_CONFIG.generateOrderMessage({ customerName: formData.customerName, phoneNumber: formData.phoneNumber, address: formData.address, city: formData.city, notes: formData.notes, items: cart, subtotal, deliveryFee, total });
      const waURL = `https://wa.me/${WHATSAPP_CONFIG.ADMIN_NUMBER}?text=${waMessage}`;
      clearCart();
      addToast('Order placed! Redirecting...', 'success');
      navigate('/order-success', { state: { order, customerInfo: formData, total, waURL } });
    } catch { addToast('Failed to place order. Please try again.', 'error'); }
    finally { setLoading(false); }
  };

  /* ── Empty cart ── */
  if (cart.length === 0) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <h2 className="text-2xl font-black text-white mb-4">Your cart is empty</h2>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold px-6 py-3 rounded-lg transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-12">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4700]/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <nav className="flex items-center gap-2 text-[12px] text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-gray-300">Checkout</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#ff4700]/15 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-[#ff4700]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              CHECK<span className="text-[#ff4700]">OUT</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Contact Info */}
              <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                <SectionTitle>Contact Information</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required placeholder="Enter your full name" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number *</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required placeholder="03XXXXXXXXX" className={inputCls} />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                <SectionTitle>Shipping Address</SectionTitle>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>City *</label>
                    <select name="city" value={formData.city} onChange={handleChange} required className={inputCls + ' cursor-pointer'}>
                      <option value="">Select City</option>
                      {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Complete Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required rows={3} placeholder="House/Flat #, Street, Area, Landmark" className={inputCls + ' resize-none'} />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                <SectionTitle>Additional Notes (Optional)</SectionTitle>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Any special instructions for your order" className={inputCls + ' resize-none'} />
              </div>

              {/* Payment Method */}
              <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                <SectionTitle>Payment Method</SectionTitle>
                <div className="bg-[#0d0d0d] border border-[#ff4700]/30 rounded-lg p-4 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#ff4700] flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff4700]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Cash on Delivery</p>
                    <p className="text-gray-500 text-xs mt-0.5">Pay when you receive your order</p>
                  </div>
                  <span className="ml-auto text-[#10b981] text-[10px] font-black uppercase tracking-wide bg-[#10b981]/10 px-2 py-1 rounded">Available</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-black py-4 rounded-xl transition-colors text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/>
                    </svg>
                    Place Order via WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <Link to="/cart" className="flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-wide">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
              </Link>

            </form>
          </motion.div>

          {/* ── Right: Order Summary ── */}
          <div className="w-full lg:w-1/3 space-y-4">

            {/* Summary */}
            <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-[#0d0d0d] border-b border-white/5">
                <h2 className="text-white font-black text-sm uppercase tracking-widest">Order Summary</h2>
              </div>
              <div className="p-6">
                {/* Items */}
                <div className="space-y-4 mb-5 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 bg-[#0d0d0d] border border-white/5 rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-xs font-bold line-clamp-2 leading-snug mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-[10px]">Qty: {item.quantity}</p>
                        <p className="text-[#ff4700] text-xs font-black mt-0.5">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({cart.length} items)</span>
                    <span className="text-white font-bold">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span className="text-[#10b981] font-bold text-xs uppercase">
                      {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                    <span className="text-gray-400 font-bold text-sm">Total</span>
                    <span className="text-[#ff4700] font-black text-2xl">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-[#111] border border-white/5 rounded-xl p-5 space-y-4">
              {[
                { icon: ShieldCheck,    label: '100% Original Products', sub: 'Sourced from trusted brands only', color: 'text-[#ff4700]' },
                { icon: Truck,          label: 'Cash on Delivery',        sub: 'Pay when you receive',            color: 'text-[#10b981]' },
                { icon: RotateCcw,      label: '7 Days Return',           sub: 'Hassle-free return policy',       color: 'text-[#ff4700]' },
                { icon: HeadphonesIcon, label: '24/7 Support',            sub: "We're here to help",              color: 'text-[#ff4700]' },
              ].map(({ icon: Icon, label, sub, color }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold mb-0.5">{label}</p>
                    <p className="text-gray-600 text-[10px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
