import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingCart, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import { productsAPI } from '../services/products'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'

const BADGE_STYLES = [
  { text: 'BEST SELLER', bg: '#ff4700' },
  { text: 'SAVE $50',    bg: '#1a1a1a', border: true },
  { text: 'NEW',         bg: '#10b981' },
  { text: '-20%',        bg: '#8b5cf6' },
  { text: '-15%',        bg: '#ef4444' },
]

const FeaturedProducts = () => {
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    productsAPI.getAll({ limit: 8, sort: '-createdAt' })
      .then(res => setProducts(res.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    addToast(`${product.name} added to cart!`, 'success')
  }

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' })
  }

  const discount = (p) =>
    p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : null

  if (loading) {
    return (
      <section className="bg-[#0a0a0a] py-12 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-7 w-40 bg-white/10 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-[#0f0f0f] rounded-xl border border-white/5 animate-pulse h-72" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section className="bg-[#0a0a0a] py-12 border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
            Top Deals
          </h2>
          <Link
            to="/deals"
            className="flex items-center gap-2 text-[#ff4700] text-sm font-bold hover:text-[#e03e00] transition-colors"
          >
            View All Deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          {/* Scroll Arrows */}
          <button
            onClick={() => scroll(-1)}
            className="hidden lg:flex absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-[#111] items-center justify-center text-white hover:border-[#ff4700] hover:text-[#ff4700] transition-colors z-10 shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="hidden lg:flex absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-[#111] items-center justify-center text-white hover:border-[#ff4700] hover:text-[#ff4700] transition-colors z-10 shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable row on mobile, grid on lg */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {products.map((product, i) => {
              const off = discount(product)
              const badge = BADGE_STYLES[i % BADGE_STYLES.length]

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group flex-shrink-0 w-52 lg:w-auto"
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="block bg-[#0f0f0f] rounded-xl overflow-hidden border border-white/5 hover:border-[#ff4700] hover:shadow-[0_0_18px_rgba(255,71,0,0.15)] transition-all duration-300 flex flex-col relative p-4"
                  >
                    {/* Badge */}
                    <span
                      className="absolute top-3 left-3 z-10 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider"
                      style={{
                        backgroundColor: badge.bg,
                        border: badge.border ? '1px solid rgba(255,255,255,0.15)' : 'none',
                      }}
                    >
                      {badge.text === 'SAVE $50' && off ? `SAVE $${Math.round((product.originalPrice - product.price))}` : badge.text}
                    </span>

                    {/* Image */}
                    <div className="relative aspect-square flex items-center justify-center mb-3 pt-5">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]"
                        />
                      ) : (
                        <Package className="w-14 h-14 text-white/10" />
                      )}
                    </div>

                    {/* Info */}
                    <h3 className="font-medium text-gray-300 text-[12px] leading-snug line-clamp-2 mb-2 group-hover:text-white transition-colors">
                      {product.name}
                    </h3>

                    {/* Stars */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[#ff4700] text-[10px] tracking-tighter">★★★★★</span>
                      <span className="text-gray-500 text-[10px]">4.8 (1.2K)</span>
                    </div>

                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-base">
                          ${product.price?.toLocaleString()}
                        </span>
                        {off && (
                          <span className="text-gray-500 text-[10px] line-through">
                            ${(product.originalPrice || product.price * 1.2).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={product.stock === 0}
                        className="flex items-center justify-center w-8 h-8 bg-white/5 border border-white/10 rounded hover:bg-[#ff4700] hover:border-[#ff4700] hover:text-white text-gray-400 transition-colors disabled:opacity-40"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
