import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Truck, RefreshCcw, Shield, Lock } from 'lucide-react'

const trust = [
  { icon: Truck,      label: 'FREE SHIPPING',  sub: 'On orders over $49'  },
  { icon: RefreshCcw, label: 'EASY RETURNS',   sub: '30-day return policy' },
  { icon: Shield,     label: '2-YR WARRANTY',  sub: 'On most products'    },
  { icon: Lock,       label: 'SECURE PAYMENTS',sub: '100% encrypted'      },
]

const Hero = () => (
  <section className="w-full flex flex-col bg-[#0a0a0a]">

    {/* ── Main Hero ── */}
    <div className="relative w-full overflow-hidden">

      {/* Mobile: stacked layout */}
      <div className="flex flex-col lg:hidden">

        {/* Mobile image on top */}
        <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden">
          <img
            src="/hero-bg.png"
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay at bottom so text reads clearly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </div>

        {/* Mobile text below image */}
        <motion.div
          className="px-5 pt-6 pb-10 flex flex-col items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#ff4700] font-bold tracking-[0.12em] uppercase text-[11px] mb-3">
            ENGINEERED TO WIN
          </p>

          <h1 className="text-[42px] sm:text-5xl font-black text-white leading-[0.95] tracking-tight mb-4 italic uppercase">
            GEAR THAT <br />
            <span className="text-[#ff4700]">ELEVATES</span><br />
            <span className="text-[#ff4700]">EVERY PLAY</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base mb-7 leading-relaxed max-w-sm">
            Precision performance. Premium quality. Built for gamers who demand more.
          </p>

          <div className="flex flex-col xs:flex-row gap-3 w-full">
            <Link
              to="/shop"
              className="group flex items-center justify-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold px-6 py-3.5 rounded-[4px] text-sm uppercase tracking-wide transition-colors"
            >
              SHOP NOW
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/deals"
              className="flex items-center justify-center bg-transparent border border-gray-600 hover:border-white text-white font-bold px-6 py-3.5 rounded-[4px] text-sm uppercase tracking-wide transition-colors"
            >
              EXPLORE DEALS
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Desktop: side-by-side layout */}
      <div className="hidden lg:flex relative min-h-[650px] items-center">

        {/* BG image full bleed */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.png"
            alt="Hero Background"
            className="absolute right-[-10%] top-[-5%] w-[110%] h-[130%] object-cover object-right-top scale-[0.80] opacity-95"
          />
          {/* Slanted dark panel */}
          <div
            className="absolute top-0 bottom-0 left-[-20%] w-[65%] bg-[#0a0a0a] border-r-[3px] border-[#ff4700]"
            style={{ transform: 'skewX(18deg)', transformOrigin: 'bottom' }}
          />
        </div>

        {/* Desktop content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="w-[55%] flex flex-col items-start text-left py-20 pl-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-[#ff4700] font-bold tracking-[0.1em] uppercase text-sm mb-4">
              ENGINEERED TO WIN
            </p>

            <h1 className="text-[80px] font-black text-white leading-[0.95] tracking-tight mb-6 italic uppercase">
              GEAR THAT <br />
              <span className="text-[#ff4700]">ELEVATES</span> <br />
              <span className="text-[#ff4700]">EVERY PLAY</span>
            </h1>

            <p className="text-gray-400 text-lg mb-10 max-w-[420px] leading-relaxed font-medium">
              Precision performance. Premium quality.<br />
              Built for gamers who demand more.
            </p>

            <div className="flex gap-4">
              <Link
                to="/shop"
                className="group flex items-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold px-8 py-3.5 rounded-[4px] text-[14px] uppercase tracking-wide transition-colors"
              >
                SHOP NOW
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/deals"
                className="flex items-center justify-center bg-transparent border border-gray-400 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-[4px] text-[14px] uppercase tracking-wide transition-colors"
              >
                EXPLORE DEALS
              </Link>
            </div>
          </motion.div>
        </div>

        {/* PRO SERIES badge */}
        <div className="absolute bottom-8 right-8 text-right z-10">
          <h3 className="text-white text-2xl font-black italic tracking-wider uppercase">
            <span className="text-[#ff4700]">.PRO</span> SERIES
          </h3>
          <p className="text-gray-400 text-sm">Dominate. Any Game.</p>
        </div>
      </div>
    </div>

    {/* ── Trust Bar ── */}
    <div className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trust.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <Icon className="w-5 h-5 text-[#ff4700] flex-shrink-0 stroke-[1.5]" />
              <div>
                <p className="text-white font-bold text-[11px] sm:text-[13px] tracking-wide uppercase leading-tight">{label}</p>
                <p className="text-gray-500 text-[10px] sm:text-[12px] mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  </section>
)

export default Hero
