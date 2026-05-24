import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Truck, RotateCcw, Info, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import WhyChooseUs from '../components/WhyChooseUs';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, total, itemCount } = useCart();

  const formatPrice = (price) => Number(price).toLocaleString('en-PK');

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-12">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4700]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff4700]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <nav className="flex items-center gap-2 text-[12px] text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300">Cart</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#ff4700]/15 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-[#ff4700]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              YOUR <span className="text-[#ff4700]">CART</span>
              <span className="text-gray-500 text-lg sm:text-xl font-bold ml-3">({itemCount} Items)</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Empty State ── */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-9 h-9 text-gray-600" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-500 text-sm mb-8">Add some products to get started</p>
            <Link
              to="/shop"
              className="bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold px-8 py-3 rounded text-sm transition-colors uppercase tracking-wide"
            >
              Browse Products
            </Link>
          </div>

        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Left: Cart Items ── */}
            <div className="w-full lg:w-2/3">
              <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">

                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/5 text-gray-600 text-[10px] font-black tracking-widest uppercase bg-[#0d0d0d]">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                  <div className="col-span-1" />
                </div>

                {/* Items */}
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, paddingTop: 0, paddingBottom: 0 }}
                      transition={{ duration: 0.22 }}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-5 py-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Product Info */}
                      <div className="col-span-1 sm:col-span-5 flex items-center gap-4">
                        <div className="w-18 h-18 min-w-[4.5rem] aspect-square bg-[#0d0d0d] border border-white/5 rounded-lg p-2 flex items-center justify-center">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">{item.name}</h3>
                          <p className="text-gray-600 text-[10px] capitalize mb-1.5">{item.category}</p>
                          <div className="flex items-center gap-1 text-[#10b981]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span className="text-[10px] font-bold">In Stock</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                        <span className="sm:hidden text-gray-600 text-[10px] font-black uppercase tracking-widest">Price</span>
                        <span className="text-gray-300 font-bold text-sm">Rs. {formatPrice(item.price)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                        <span className="sm:hidden text-gray-600 text-[10px] font-black uppercase tracking-widest">Qty</span>
                        <div className="flex items-center bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg leading-none"
                          >−</button>
                          <span className="w-9 h-8 flex items-center justify-center text-white text-xs font-black border-x border-white/10">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg leading-none"
                          >+</button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                        <span className="sm:hidden text-gray-600 text-[10px] font-black uppercase tracking-widest">Total</span>
                        <span className="text-white font-black text-sm">Rs. {formatPrice(item.price * item.quantity)}</span>
                      </div>

                      {/* Remove */}
                      <div className="col-span-1 sm:col-span-1 flex justify-end sm:justify-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-600 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Footer */}
                <div className="px-5 py-4 flex items-center justify-between bg-[#0d0d0d]">
                  <Link
                    to="/shop"
                    className="group flex items-center gap-2 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-4 py-2 transition-colors text-xs font-bold uppercase tracking-wide"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-wide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="w-full lg:w-1/3 space-y-4">

              {/* Summary Card */}
              <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 bg-[#0d0d0d]">
                  <h2 className="text-white font-black text-sm uppercase tracking-widest">Order Summary</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Subtotal ({itemCount} items)</span>
                      <span className="text-white font-bold">Rs. {formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <span>Shipping</span>
                        <Info className="w-3 h-3 text-gray-700" />
                      </div>
                      <span className="text-[#10b981] font-bold text-xs uppercase tracking-wide">Free</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-bold text-sm">Total</span>
                      <span className="text-[#ff4700] font-black text-2xl">Rs. {formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full flex items-center justify-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-black py-4 rounded-lg transition-colors text-sm uppercase tracking-wide"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-[#111] border border-white/5 rounded-xl p-5 space-y-4">
                {[
                  { icon: ShieldCheck, label: '100% Original Products', sub: 'Sourced from trusted brands only', color: 'text-[#ff4700]' },
                  { icon: Truck,       label: 'Fast Delivery',           sub: '1–3 days all over Pakistan',     color: 'text-[#10b981]' },
                  { icon: RotateCcw,   label: '7 Days Return',           sub: 'Hassle-free return policy',      color: 'text-[#ff4700]' },
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
        )}
      </div>

      <WhyChooseUs />
    </div>
  );
};

export default Cart;
