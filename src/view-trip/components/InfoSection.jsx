import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import fetchslider from '@/lib/FetchSlider';

function InfoSection({ trip }) {
  const [pic, setPic] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const place = trip?.userSelection?.location;


  const handleSearch = async (place) => {
    try {
      const img = await fetchslider(place);
      //allimages.push(...img.image)
      //console.log(allimages);
      const allimages=img.map(e=>e.image)
      setPic(allimages)
      setShowCarousel(true);
      //console.log("Images fetched successfully!");
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pic.length) % pic.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pic.length);
  };

  useEffect(() => {
    if (pic.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % pic.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [pic]);
  useEffect(()=>{
    handleSearch(place)
  },[])
  return (
    <div>

      <div>
        {showCarousel && (
          <div className="relative w-full h-[75vh] mx-auto overflow-hidden">
            <img
              src={pic[currentIndex]}
              alt={`pic ${currentIndex + 1}`}
              className="w-full h-full object-cover rounded-3xl"
            />
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 font-bold text-3xl text-white p-3 rounded-full shadow-lg"
            >
              &lt;
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 font-bold text-3xl text-white p-3 rounded-full shadow-lg"
            >
              &gt;
            </button>
          </div>
        )}

        {isFetching && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        )}
      </div >
      <div className='flex flex-row justify-end'>
        <Link to={"/"} className='text-white  bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-1 mt-6 text-center'>Log Out</Link>
      </div>

      <div className='flex justify-between items-center '>
        <div className='my-6 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
          <div className='flex gap-6 mt-4 flex-col text-center md:flex-row'>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-2 px-4 md:text-md'>🗓️ {trip?.userSelection?.noOfDays} Day</h2>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-2 px-4 md:text-md'>👩‍👧‍👦 Number of Travelers: {trip?.userSelection?.travelWith} People</h2>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-2 px-4 md:text-md'>💵 {trip?.userSelection?.budget} Budget</h2>
            <Link to={"/create-trip"} className='text-white focus:outline-none focus:ring-4 bg-[#f56551] focus:ring-[#b83827] hover:bg-[#b83827] font-medium rounded-full text-sm px-5 py-2.5 text-center'>Create Again</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default InfoSection;
