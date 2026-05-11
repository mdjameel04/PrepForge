import React from 'react'
import Navbar from './components/navbar'
import HeroSection from './components/heroSection'
import Stats from './components/stats'
import HowItWorks from './components/Howitworks'
import Features from './components/Features'
import Topics from './components/topics'
import Testimonials from './components/testimonials'
import Footer from './components/footer'


const page = () => {
  return (
    <div> 
      <Navbar/>
      <HeroSection/>
      <Stats/>
      <HowItWorks/>
      <Features/>
      <Topics/>
      <Testimonials/>
      <Footer/>
     </div>
  )
}

export default page