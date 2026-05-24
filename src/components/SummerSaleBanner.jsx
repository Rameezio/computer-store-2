import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923041109928'

const PromoBanner = () => {
  return (
    <section className="bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="relative bg-[#111] rounded-2xl overflow-hidden border border-white/5">

          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff4700]/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#ff4700]/5 to-transparent pointer-events-none" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#ff4700 1px, transparent 1px), linear-gradient(90deg, #ff4700 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 sm:px-12 py-10">

            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                Pakistan's Premier Computer Store
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-3">
                <span className="text-white">Authentic Gear.</span>
                <br />
                <span className="text-[#ff4700]">Delivered to Your Door.</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                Computers, Laptops, Accessories and more — 100% original products with Cash on Delivery across Pakistan.
              </p>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors uppercase tracking-wide min-w-[200px]"
              >
                Browse Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20place%20an%20order`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors uppercase tracking-wide min-w-[200px]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/>
                </svg>
                Order via WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner
