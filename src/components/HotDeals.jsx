import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HotDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        if (seconds > 0) { seconds -= 1 }
        else {
          seconds = 59
          if (minutes > 0) { minutes -= 1 }
          else {
            minutes = 59
            if (hours > 0) { hours -= 1 }
            else {
              hours = 23
              if (days > 0) { days -= 1 }
            }
          }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-12 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] overflow-hidden border border-[#ff4700]/20"
        >
          {/* Banner Background */}
          <div className="relative flex flex-col lg:flex-row min-h-[300px] bg-[#0f0f0f]">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/mega-sale-bg.png"
                alt="Mega Sale"
                className="w-full h-full object-cover object-right md:object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/95 via-[#0f0f0f]/70 to-transparent w-full md:w-2/3" />
            </div>

            {/* Ambient Orange Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#ff4700]/10 via-transparent to-transparent" />

            {/* Left Content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex-1 flex flex-col justify-center max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff4700]/10 border border-[#ff4700]/20 w-max mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4700] animate-pulse" />
                <span className="text-[#ff4700] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                  MEGA SALE LIVE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 uppercase tracking-tight">
                UPGRADE YOUR <br />
                <span className="text-[#ff4700]">BATTLESTATION</span>
              </h2>

              <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
                Unbeatable discounts on laptops, premium headsets, and authentic gaming gear. Limited stock!
              </p>

              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/shop"
                    className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#ff4700] hover:bg-[#e03e00] rounded-md font-bold text-white transition-all shadow-[0_0_20px_rgba(255,71,0,0.3)]"
                  >
                    <span className="text-sm uppercase">SHOP DEALS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Countdown Timer */}
                <div className="flex gap-2 sm:gap-3">
                  {[
                    { value: timeLeft.days, label: 'DAYS' },
                    { value: timeLeft.hours, label: 'HRS' },
                    { value: timeLeft.minutes, label: 'MINS' },
                    { value: timeLeft.seconds, label: 'SECS' }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-lg bg-[#111] border border-[#ff4700]/20 flex items-center justify-center mb-1.5">
                        <span className="text-lg sm:text-2xl font-black text-white tabular-nums">
                          {String(item.value).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-gray-500 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HotDeals
