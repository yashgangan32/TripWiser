import React from 'react'
import { Button } from '../ui/button'
import {Link} from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col items-center m-auto gap-9'>
        <h1 className='font-extrabold text-[50px]  md:mt-36 mt-14 text-center p-2'>
            <span className='text-[#f56551] '>
              Discover Your Next Adventure With AI:</span> Personalized ItineRaries at Your Fingertips
            
            <p className='text-gray-500 text-xl text-center mt-4'>
                Your Personal trip planner and travel curator, creating custom itineraries tailored to your interest and budget.
            </p>
        </h1>
        <Link to={'/login'}>
        <Button className="mb-10">Get Started,It's Free</Button>
        </Link>
    </div>
  )
}

export default Hero