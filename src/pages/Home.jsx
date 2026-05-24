import React from 'react'
import Hero from '../components/Hero'
import ShopByCategory from '../components/ShopByCategory'
import FeaturedProducts from '../components/FeaturedProducts'
import SummerSaleBanner from '../components/SummerSaleBanner'
import BuildYourSetup from '../components/BuildYourSetup'
import WhyChooseUs from '../components/WhyChooseUs'
import FinalCTA from '../components/FinalCTA'

const Home = () => (
  <main className="bg-[#0a0a0a]">
    <Hero />
    <ShopByCategory />
    <FeaturedProducts />
    <SummerSaleBanner />
    <BuildYourSetup />
    <WhyChooseUs />
    <FinalCTA />
  </main>
)

export default Home
