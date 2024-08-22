import React, { useState, useEffect } from 'react'
import { GrMapLocation } from "react-icons/gr";
import axios from 'axios';
import handleloc from '../../lib/MapRedirect';
import fetchImage from '@/lib/FetchImg';

function PlaceCardItem({ place, trip ,delay }) {
  const page = 1;
  const [pic, setPic] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //console.log(place);
  
  const [currentIndex, setCurrentIndex] = useState(0);

 /* useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(place.placeName);
      console.log(delay);
    },delay); 
    return () => clearTimeout(timer);
  }, [delay]);*/

  


  const handleSearch = async (place) => {
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
  };

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
    className={`relative border rounded-xl p-3 mt-2 flex gap-5 w-90 h-48 transition-all cursor-pointer ${isHovered ? 'scale-105 shadow-md' : ''}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    <img
      src={pic && pic[0] ? pic[0].image : '/placeholder.jpg'}
      className='w-[160px] h-[160px] rounded-xl object-cover flex-shrink-0'
      alt={place.placeName}
      //onError={handleImageError(pic)}
    />
    <div>
      <h2 className='font-medium m-auto'>{place.placeName}</h2>
      <p className='text-sm text-gray-500 mt-1'>{place.placeDetails}</p>
      <GrMapLocation
        className='hover:scale-150 absolute bottom-3 right-3 text-gray-700 w-[20px] h-[20px]'
        onClick={handleLocationClick}
      />
    </div>
  </div>
  )
}
export default PlaceCardItem