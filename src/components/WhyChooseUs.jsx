import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Mail, Users, ArrowRight } from 'lucide-react'

const features = [
  { icon: MessageSquare, title: 'Live Chat',      sub: 'Get instant help',          href: '#' },
  { icon: Mail,          title: 'Email Support',  sub: 'support@alquresh.pk',        href: 'mailto:support@alquresh.pk' },
  { icon: Users,         title: 'Community',      sub: 'Join 50K+ customers',       href: '#' },
]

const WhyChooseUs = () => {
  return (
    <section className="bg-[#0a0a0a] py-8 border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Left: Support CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f0f0f] border border-[#ff4700]/20 rounded-xl overflow-hidden relative flex flex-col sm:flex-row items-center sm:items-start p-8 lg:p-10"
          >
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at right, #ff4700 0%, transparent 50%)' }} />

            <div className="relative z-10 sm:w-1/3 flex justify-center sm:justify-start mb-6 sm:mb-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Support"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#ff4700]/50"
              />
            </div>

            <div className="relative z-10 sm:w-2/3 flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-[#ff4700] font-bold text-[10px] sm:text-xs tracking-widest uppercase mb-2">We're here to help</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white italic tracking-tight mb-2 uppercase">24/7 Support</h2>
              <p className="text-gray-400 text-xs sm:text-sm mb-6">Our team is always ready to assist you.</p>
              <button className="flex items-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold text-[11px] sm:text-xs px-6 py-2.5 rounded transition-colors uppercase">
                Contact Support <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* ── Right: Feature Icons with Animations ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f0f0f] border border-[#ff4700]/20 rounded-xl p-8 lg:p-10 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-4 lg:gap-8"
          >
            {features.map(({ icon: Icon, title, sub, href }, i) => (
              <React.Fragment key={title}>
                {i > 0 && <div className="hidden sm:block w-px h-12 bg-white/10 flex-shrink-0" />}

                <motion.a
                  href={href}
                  className="flex items-center gap-4 w-full sm:w-1/3 justify-center sm:justify-start group cursor-pointer"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  {/* Icon circle with animations */}
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-full border border-[#ff4700] flex items-center justify-center text-[#ff4700] relative overflow-hidden"
                    variants={{
                      rest:  { backgroundColor: 'rgba(255,71,0,0)',    borderColor: 'rgba(255,71,0,1)',   scale: 1    },
                      hover: { backgroundColor: 'rgba(255,71,0,1)',    borderColor: 'rgba(255,71,0,1)',   scale: 1.15 },
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {/* Pulse ring on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#ff4700]"
                      variants={{
                        rest:  { scale: 1,   opacity: 0 },
                        hover: { scale: 1.6, opacity: 0 },
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                    <motion.div
                      variants={{
                        rest:  { color: '#ff4700' },
                        hover: { color: '#ffffff'  },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </motion.div>

                  {/* Text */}
                  <div>
                    <motion.h4
                      className="font-bold text-xs uppercase mb-1"
                      variants={{
                        rest:  { color: '#ffffff' },
                        hover: { color: '#ff4700' },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {title}
                    </motion.h4>
                    <motion.p
                      className="text-[11px]"
                      variants={{
                        rest:  { color: '#6b7280' },
                        hover: { color: '#9ca3af' },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {sub}
                    </motion.p>
                  </div>
                </motion.a>
              </React.Fragment>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
