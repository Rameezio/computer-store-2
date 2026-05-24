import React from 'react'
import { motion } from 'framer-motion'
import { Star, ShieldCheck } from 'lucide-react'

const reviews = [
  {
    name: 'Ahmed Raza',
    product: 'PS5 DualSense Controller',
    rating: 5,
    review: 'Received my DualSense in pristine condition within 2 days. Packaging was secure and the product is 100% genuine. Highly recommended.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    name: 'Hassan Ali',
    product: 'Xbox Series X Controller',
    rating: 5,
    review: 'Ordered an Xbox Series X controller on Monday, it arrived by Wednesday. Cash on Delivery made the whole process seamless. Great experience.',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
  },
  {
    name: 'Usman Khan',
    product: 'HyperX Cloud Gaming Headset',
    rating: 5,
    review: 'The team helped me choose the right headset for my setup via WhatsApp. Fast response, honest advice, and flawless delivery. Will definitely order again.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
]

const CustomerReviews = () => {
  return (
    <section className="bg-[#f5f5f5] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <span className="text-[#003791] text-xs font-black tracking-widest uppercase block mb-2">Customer Reviews</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] tracking-tight mb-2">
            Trusted by Gamers Across Pakistan
          </h2>
          <p className="text-gray-400 text-sm">Real reviews from verified buyers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{review.review}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-black text-[#1a1a1a] text-sm">{review.name}</p>
                  <p className="text-[#003791] text-[11px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified — {review.product}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews
