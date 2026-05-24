import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Truck, Headphones, RotateCcw, Users, Package, Star, Award, ArrowRight } from 'lucide-react';

const STATS = [
  { value: '50,000+', label: 'Happy Customers'  },
  { value: '500+',    label: 'Products'          },
  { value: '5+',      label: 'Years Experience'  },
  { value: '4.9/5',   label: 'Customer Rating'   },
];

const VALUES = [
  { icon: Shield,     title: '100% Authentic', desc: 'Every product is 100% original, sourced directly from authorized distributors worldwide.' },
  { icon: Truck,      title: 'Fast Delivery',  desc: 'We deliver across Pakistan within 1–3 business days with real-time tracking.' },
  { icon: Headphones, title: '24/7 Support',   desc: 'Our team is available around the clock to assist you with any queries.' },
  { icon: RotateCcw,  title: 'Easy Returns',   desc: 'Not satisfied? Return any product within 30 days — no questions asked.' },
];

const HIGHLIGHTS = [
  { icon: Users,   label: 'Trusted by 50,000+', sub: 'gamers worldwide'       },
  { icon: Award,   label: 'Authorized Dealer',  sub: 'for top gaming brands'  },
  { icon: Star,    label: '4.9 Star Rating',    sub: 'from verified reviews'  },
  { icon: Package, label: '500+ Products',      sub: 'across all categories'  },
];

const AboutUs = () => {
  useEffect(() => { document.title = 'About Us — Al-Quresh Traders'; }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4700]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4700]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-2 text-[12px] text-gray-500 mb-5">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-300">About Us</span>
            </nav>
            <p className="text-[#ff4700] text-xs font-black uppercase tracking-[0.25em] mb-3">Who We Are</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              ABOUT <span className="text-[#ff4700]">AL-QURESH TRADERS</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Premium gaming gear for elite performance and style. Built for gamers who demand more — backed by 50,000+ satisfied customers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="border-b border-white/5 bg-[#0f0f0f]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-center py-10 px-4"
              >
                <p className="text-3xl sm:text-4xl font-black text-[#ff4700] mb-1">{stat.value}</p>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Mission Section ── */}
        <div className="py-20 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[#ff4700] text-xs font-black tracking-[0.25em] uppercase mb-3 block">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5 leading-tight">
                Bringing World-Class<br />Gaming Gear to Every Gamer
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Al-Quresh Traders was founded with one goal — give every gamer access to premium, authentic gaming equipment at fair prices. From mechanical keyboards to high-refresh monitors, from pro mice to immersive headsets, we carry it all.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                We partner directly with authorized distributors to eliminate counterfeits and pass the savings to our customers. Our passion is gaming — and that shows in every product we stock and every order we ship.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold px-7 py-3 rounded-sm text-sm transition-colors uppercase tracking-wide"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-[#0f0f0f] border border-white/5 hover:border-[#ff4700]/40 rounded-xl p-5 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-[#ff4700]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#ff4700]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#ff4700]" />
                    </div>
                    <p className="text-white font-bold text-sm mb-0.5">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.sub}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="py-20 border-b border-white/5">
          <div className="text-center mb-12">
            <span className="text-[#ff4700] text-xs font-black tracking-[0.25em] uppercase mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[#0f0f0f] border border-white/5 hover:border-[#ff4700]/40 hover:shadow-[0_0_20px_rgba(255,71,0,0.08)] rounded-xl p-6 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#ff4700]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff4700]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#ff4700]" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{val.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-[#0f0f0f] border border-[#ff4700]/20 rounded-2xl p-10 sm:p-16 text-center overflow-hidden"
          >
            {/* bg glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff4700]/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4700]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ff4700]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[#ff4700] text-xs font-black uppercase tracking-[0.25em] mb-3">Get Started</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
                Ready to Level Up?
              </h2>
              <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                Shop premium gaming gear — 100% authentic products, fast delivery, and 24/7 support for every gamer.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/shop"
                  className="bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold px-8 py-3 rounded-sm text-sm transition-colors uppercase tracking-wide"
                >
                  Shop Now
                </Link>
                <Link
                  to="/contact"
                  className="border border-white/20 hover:border-white/50 text-white font-bold px-8 py-3 rounded-sm text-sm transition-colors uppercase tracking-wide"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
