import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Plus, Minus } from 'lucide-react'

const faqs = [
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy for all unused products in their original packaging.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship to most countries globally. Shipping fees will apply at checkout.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days. Express shipping options are available.' },
  { q: 'Are your products covered by warranty?', a: 'All our products come with a minimum 1-year manufacturer warranty.' },
  { q: 'Do you offer bulk or business discounts?', a: 'Yes! Please contact our sales team for corporate and bulk pricing.' },
]

const FinalCTA = () => {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section className="bg-[#0a0a0a] py-8 border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h2 className="text-lg font-black text-white uppercase tracking-wide mb-6">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col border border-white/10 rounded-xl bg-[#0f0f0f] overflow-hidden">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/5 last:border-0">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-gray-300 text-[13px] font-medium">{faq.q}</span>
                    {openFaq === i ? <Minus className="w-4 h-4 text-gray-500" /> : <Plus className="w-4 h-4 text-gray-500" />}
                  </button>
                  {openFaq === i && (
                    <div className="p-4 pt-0 text-gray-500 text-[11px] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f0f0f] border border-[#ff4700]/20 rounded-xl overflow-hidden relative p-8 flex flex-col justify-center min-h-[300px]"
          >
             {/* Neon Background Lines Placeholder */}
             <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-screen"></div>
             <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent"></div>

             <div className="relative z-10 max-w-md mt-4 lg:mt-0">
               <h2 className="text-xl sm:text-2xl font-black text-white italic tracking-tight mb-2 uppercase">Get Exclusive Deals & Updates</h2>
               <p className="text-gray-400 text-xs sm:text-sm mb-6">Join our community and never miss a drop.</p>
               
               <form className="flex mb-6" onSubmit={(e) => e.preventDefault()}>
                 <input 
                   type="email" 
                   placeholder="Enter your email address" 
                   className="flex-1 bg-white border-0 px-4 py-2.5 sm:py-3 text-sm text-black rounded-l focus:outline-none"
                   required
                 />
                 <button type="submit" className="bg-[#ff4700] hover:bg-[#e03e00] text-white font-bold text-[11px] sm:text-xs px-4 sm:px-6 py-2.5 sm:py-3 rounded-r transition-colors uppercase">
                   Subscribe
                 </button>
               </form>

               <div className="flex flex-wrap gap-4 items-center">
                 <div className="flex items-center gap-1.5 text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
                   <CheckSquare className="w-3.5 h-3.5 text-[#ff4700]" /> Exclusive Offers
                 </div>
                 <div className="flex items-center gap-1.5 text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
                   <CheckSquare className="w-3.5 h-3.5 text-[#ff4700]" /> New Product Alerts
                 </div>
                 <div className="flex items-center gap-1.5 text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
                   <CheckSquare className="w-3.5 h-3.5 text-[#ff4700]" /> Early Access
                 </div>
               </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
export default FinalCTA
