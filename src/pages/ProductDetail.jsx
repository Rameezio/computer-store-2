import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Truck, RotateCcw, Headphones as HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { productsAPI } from '../services/products';
import WhyChooseUs from '../components/WhyChooseUs';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923041109928';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await productsAPI.getById(id);
      const p = res.product;
      setProduct(p);
      document.title = `${p.name} — Al-Quresh Traders`;
      if (p.category) {
        const related = await productsAPI.getAll({ category: p.category, limit: 4 });
        setRelatedProducts(related.products?.filter((r) => r._id !== p._id).slice(0, 4) || []);
      }
    } catch {
      addToast('Product not found', 'error');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.images?.[0],
        stock: product.stock,
      },
      quantity
    );
    addToast(`${product.name} added to cart!`, 'success');
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const productUrl = window.location.href;
    const imageUrl   = product.images?.[0] || '';
    const msg =
      `*Al-Quresh Traders — Order Inquiry*%0A%0A` +
      `🛒 *Product:* ${encodeURIComponent(product.name)}%0A` +
      `💰 *Price:* Rs. ${encodeURIComponent(formatPrice(product.price))}%0A` +
      `📦 *Quantity:* ${quantity}%0A%0A` +
      `🔗 *Product Link:*%0A${encodeURIComponent(productUrl)}%0A%0A` +
      `🖼️ *Image:*%0A${encodeURIComponent(imageUrl)}%0A%0A` +
      `Please confirm availability and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const formatPrice = (price) => Number(price).toLocaleString('en-PK');

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen pt-8 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Skeleton */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20 animate-pulse">
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] rounded-2xl bg-[#111] mb-4" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 rounded-xl bg-[#111]" />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="h-4 w-24 rounded bg-[#111]" />
              <div className="h-10 w-full rounded bg-[#111]" />
              <div className="h-6 w-32 rounded bg-[#111]" />
              <div className="h-20 w-full rounded bg-[#111]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = product.images?.length ? product.images : ['https://via.placeholder.com/800'];
  const inStock = product.stock > 0;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-12 pt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="text-gray-400 text-[10px] sm:text-xs flex items-center gap-2 mb-8 font-medium whitespace-nowrap overflow-x-auto hide-scrollbar">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-gray-600">&gt;</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="text-gray-600">&gt;</span>
          <span className="hover:text-primary transition-colors cursor-pointer capitalize">{product.category}</span>
          <span className="text-gray-600">&gt;</span>
          <span className="text-white truncate">{product.name}</span>
        </div>

        {/* Top Product Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20">

          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl glass-card flex items-center justify-center p-8 overflow-hidden group">
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {inStock
                  ? <span className="bg-[#25D366] text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-wider">IN STOCK</span>
                  : <span className="bg-red-500 text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-wider">OUT OF STOCK</span>
                }
                {discount && <span className="bg-[#ff4700] text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-wider">-{discount}%</span>}
              </div>
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,71,0,0.15)] transition-opacity duration-300"
              />
              <div className="absolute bottom-4 right-4 text-[10px] font-medium text-gray-400 bg-black/40 px-2 py-1 rounded">
                {activeImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
                className="w-8 h-8 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors hidden sm:flex"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-1 gap-2 sm:gap-4 overflow-x-auto hide-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden glass-card transition-all duration-300 ${
                      activeImage === idx
                        ? 'border-[#ff4700] shadow-[0_0_15px_rgba(255,71,0,0.3)]'
                        : 'border-white/5 hover:border-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                className="w-8 h-8 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors hidden sm:flex"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2 capitalize">{product.category}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-end gap-4 mb-4">
              <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Rs. {formatPrice(product.price)}</span>
              {product.originalPrice && (
                <div className="flex items-center gap-2 pb-1">
                  <span className="text-gray-500 line-through text-sm sm:text-base">Rs. {formatPrice(product.originalPrice)}</span>
                  {discount && (
                    <span className="bg-[#ff4700]/20 text-[#ff4700] px-2 py-0.5 rounded text-xs font-bold border border-[#ff4700]/30">
                      -{discount}%
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6 text-xs">
              {inStock ? (
                <div className="flex items-center gap-1 text-[#25D366] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Out of Stock</span>
                </div>
              )}
              {inStock && (
                <>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-400">Only {product.stock} left</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Specs */}
            {product.specs && [...product.specs.entries?.() ?? Object.entries(product.specs)].length > 0 && (
              <div className="mb-6">
                <table className="w-full text-xs">
                  <tbody>
                    {[...product.specs.entries?.() ?? Object.entries(product.specs)].map(([key, val]) => (
                      <tr key={key} className="border-b border-white/5">
                        <td className="py-2 text-gray-500 font-medium w-1/3">{key}</td>
                        <td className="py-2 text-white">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center bg-[#111] border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
                  >-</button>
                  <span className="w-12 h-10 flex items-center justify-center text-white font-bold border-x border-white/10">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={!inStock}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                  >+</button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="w-full bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,71,0,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppOrder}
                  disabled={!inStock}
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/>
                  </svg>
                  ORDER VIA WHATSAPP
                </motion.button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-xs text-gray-400 font-medium">1 Year Official Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span className="text-xs text-gray-400 font-medium">7 Days Return Policy</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-xs text-gray-400 font-medium">Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <HeadphonesIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-gray-400 font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">YOU MAY ALSO LIKE</h2>
              <Link to="/shop" className="text-primary text-xs font-bold uppercase hover:text-white transition-colors flex items-center gap-1">
                VIEW ALL
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <div key={rp._id} className="relative p-4 rounded-xl glass-card hover:border-[#ff4700]/50 hover:shadow-[0_0_20px_rgba(255,71,0,0.15)] transition-all duration-300 flex flex-col group">
                  <Link to={`/product/${rp._id}`} className="relative aspect-square mb-4 bg-surface rounded-lg p-4 flex items-center justify-center overflow-hidden">
                    <img src={rp.images?.[0]} alt={rp.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 opacity-90" />
                  </Link>
                  <div className="flex-grow flex flex-col">
                    <Link to={`/product/${rp._id}`}>
                      <h3 className="text-white font-bold text-xs mb-1 line-clamp-1 group-hover:text-[#ff4700] transition-colors">{rp.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-[10px] mb-2 capitalize">{rp.category}</p>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-white font-bold text-sm">Rs. {formatPrice(rp.price)}</span>
                        {rp.originalPrice && (
                          <span className="text-gray-500 text-[10px] line-through">Rs. {formatPrice(rp.originalPrice)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart({ id: rp._id, name: rp.name, category: rp.category, price: rp.price, image: rp.images?.[0], stock: rp.stock }, 1)}
                        className="w-full bg-transparent border border-white/10 hover:border-[#ff4700]/50 hover:bg-[#ff4700]/10 text-white text-[10px] font-bold py-2.5 rounded transition-all uppercase tracking-wider"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <WhyChooseUs />
    </div>
  );
};

export default ProductDetail;
