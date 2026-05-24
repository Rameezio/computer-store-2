import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Tag, Heart } from 'lucide-react';
import { productsAPI } from '../services/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';

const StarRating = ({ rating = 4.8, count = '1.2K' }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? 'text-[#ff4700]' : 'text-gray-700'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
    <span className="text-gray-500 text-[10px]">{rating} ({count})</span>
  </div>
);

const Deals = () => {
  const { addToCart } = useCart();
  const { addToast }  = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    document.title = 'Deals — Al-Quresh Traders';
    productsAPI.getAll({ limit: 24, sort: '-soldCount' })
      .then(res => {
        const all   = res.products || [];
        const deals = all.filter(p => p.originalPrice && p.originalPrice > p.price);
        setProducts(deals.length > 0 ? deals : all.slice(0, 12));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const off = (p) =>
    p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : null;

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  /* ── Product Card ── */
  const DealCard = ({ product, idx }) => {
    const discount = off(product);
    const [wished, setWished] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.04 }}
        className="group bg-[#111] border border-white/5 hover:border-[#ff4700]/50 hover:shadow-[0_0_20px_rgba(255,71,0,0.1)] transition-all duration-300 rounded-xl overflow-hidden flex flex-col"
      >
        {/* Image */}
        <Link
          to={`/product/${product._id}`}
          className="relative aspect-square bg-[#0d0d0d] flex items-center justify-center overflow-hidden p-4"
        >
          {discount && (
            <span className="absolute top-3 left-3 z-10 bg-[#ff4700] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              -{discount}%
            </span>
          )}
          {!discount && (
            <span className="absolute top-3 left-3 z-10 bg-[#10b981] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              DEAL
            </span>
          )}
          <button
            onClick={e => { e.preventDefault(); setWished(v => !v); }}
            className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
              wished
                ? 'bg-[#ff4700] border-[#ff4700] text-white'
                : 'bg-[#0d0d0d]/80 border-white/10 text-gray-500 hover:border-[#ff4700] hover:text-[#ff4700]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" fill={wished ? 'currentColor' : 'none'} />
          </button>
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            />
          ) : (
            <Package className="w-12 h-12 text-white/10" />
          )}
        </Link>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[#ff4700] text-[9px] font-black uppercase tracking-widest mb-1">AL-QURESH</p>
          <Link to={`/product/${product._id}`}>
            <h3 className="text-gray-300 text-[13px] font-medium leading-snug line-clamp-2 mb-2 group-hover:text-white transition-colors">
              {product.name}
            </h3>
          </Link>

          <StarRating />

          <div className="flex items-center gap-2 mt-2 mb-1">
            <span className="text-white font-black text-base">${product.price?.toLocaleString()}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-gray-500 text-[11px] line-through">${product.originalPrice?.toLocaleString()}</span>
            )}
            {discount && (
              <span className="text-[#ff4700] text-[11px] font-bold">-{discount}%</span>
            )}
          </div>

          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-[#10b981] text-[11px] font-bold mb-3">
              You save ${(product.originalPrice - product.price).toLocaleString()}
            </p>
          )}

          <button
            onClick={() => handleAddToCart(product)}
            disabled={product.stock === 0}
            className="mt-auto flex items-center justify-center gap-2 w-full bg-transparent border border-white/10 hover:bg-[#ff4700] hover:border-[#ff4700] text-gray-400 hover:text-white text-[11px] font-bold py-2.5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-wide"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4700]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff4700]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
          <nav className="flex items-center gap-2 text-[12px] text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300">Deals</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#ff4700]/15 flex items-center justify-center">
              <Tag className="w-4.5 h-4.5 text-[#ff4700]" />
            </div>
            <span className="text-[#ff4700] text-xs font-black uppercase tracking-[0.25em]">Limited Time Offers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
            HOT <span className="text-[#ff4700]">DEALS</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md">
            Exclusive discounts on premium gaming gear. Fast delivery, 2-year warranty.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#111] rounded-xl border border-white/5 animate-pulse overflow-hidden">
                <div className="aspect-square bg-white/5" />
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-white/5 rounded w-1/4" />
                  <div className="h-3 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                  <div className="h-9 bg-white/5 rounded mt-3" />
                </div>
              </div>
            ))}
          </div>

        ) : products.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Tag className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-white font-black text-xl mb-2">No deals right now</h3>
            <p className="text-gray-500 text-sm mb-6">Check back soon for exclusive discounts!</p>
            <Link
              to="/shop"
              className="bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold px-6 py-2.5 rounded text-sm transition-colors uppercase tracking-wide"
            >
              Browse All Products
            </Link>
          </div>

        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-white">
                <span className="text-[#ff4700]">{products.length}</span> Deals Available
              </h2>
              <span className="bg-[#ff4700] text-white text-[10px] font-black px-3 py-1.5 rounded uppercase tracking-widest">
                SALE ON NOW
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {products.map((product, i) => (
                <DealCard key={product._id} product={product} idx={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Deals;
