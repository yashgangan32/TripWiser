import React, { useState, useEffect } from 'react'
import { GrMapLocation } from "react-icons/gr";
import axios from 'axios';
import handleloc from '../../lib/MapRedirect';
import fetchImage from '@/lib/FetchImg';

function PlaceCardItem({ place, trip }) {
  const [pic, setPic] = useState();
  /*const handleSearch = async (place) => {
    try {
      const img = await fetchImage(place);
      const allImages = [];
      allImages.push(...img);
      setPic(allImages);
      const timer=setTimeout(()=>{
      console.log("card set:",place);
      },1000)
      //console.log(allImages);
      
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };*/

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  const handleLocationClick = () => {
    handleloc(place.placeName, trip.userSelection.location);
    setIsHovered(false); // Reset the hover state when the location is clicked
  };
  return (
    <div
    className={`relative border rounded-xl p-2 mt-2 flex-grow flex-col md:flex-row gap-5 m:w-90 m:h-48 transition-all cursor-pointer ${isHovered ? 'scale-105 shadow-md' : ''}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    <div className='flex'>
    <img
      src={pic && pic[0] ? pic[0].image : '/placeholder.jpg'}
      className='md:w-[160px] md:h-[160px] w-[125px] h-[125px] rounded-xl object-cover flex-shrink-0'
      alt={place.placeName}
     
    />
    <div>
      <h2 className='font-medium pl-2 '>{place.placeName}</h2>
      <p className='text-sm text-gray-500  md:block hidden p-2 '>{place.placeDetails}</p>
    </div>
    </div>
    <div>
      <p className='text-sm text-gray-500 mt-2 p-1 block md:hidden'>{place.placeDetails}</p>
      
      <GrMapLocation
        className='hover:scale-150 absolute  md:right-3 right-3 top-28 md:top-4 text-gray-700 w-[20px] h-[20px]'
        onClick={handleLocationClick}
      />
    </div>
  </div>
  )
}
export default PlaceCardItem