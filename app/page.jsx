import React from 'react'
import Navbar from './components/navbar'
import HeroSection from './components/heroSection'
import Stats from './components/stats'


const page = () => {
  return (
    <div> 
      <Navbar/>
      <HeroSection/>
      <Stats/>
     </div>
  )
}

export default page