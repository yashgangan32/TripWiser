import React, { useEffect, useState } from 'react';
import handleloc from '@/lib/MapRedirect';
import fetchHotel from '@/lib/FetchHotel';

function Hotels({ trip }) {
  const hotels = trip?.hotelData?.hotel_options || [];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pics, setPics] = useState({});

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleTouchStart = (index) => {
    setHoveredIndex(index);
  };

  const handleTouchEnd = () => {
    setHoveredIndex(null);
  };
  const handleLocationClick = (hotel) => {
    handleloc(hotel, trip.userSelection.location);
    setHoveredIndex(false); // Reset the hover state when the location is clicked
  };

  useEffect(() => {
    if (hotels.length > 0) {
      hotels.forEach((e, index) => {
        setTimeout(() => {
          handleSearch(e.hotel_name);
          // console.log("fetched:", e.hotel_name);
        }, index * 1000); // Delay each search by 1 second (index * 1000ms)
      });
    }
  }, []);

  const handleSearch = async (hotelName) => {
    try {
      const img = await fetchHotel(hotelName);
      setPics((prevPics) => ({
        ...prevPics,
        [hotelName]: img,
      }));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-xl my-7">Hotel Recommendation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:gap-5 gap-3">
        {hotels.map((item, index) => (
          <div
            key={index}
            className={`${hoveredIndex === index ? 'scale-105 shadow-md' : ''} cursor-pointer bg-gray-50 rounded-lg transition-all p-2 flex flex-col h-full`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => handleTouchStart(index)}
            onTouchEnd={handleTouchEnd}
            onClick={() => handleLocationClick(item.hotel_name)}
          >
            <div className='flex flex-row md:flex-col'>
              <img
                src={pics[item.hotel_name] && pics[item.hotel_name][0] ? pics[item.hotel_name][0].image : '/placeholder.jpg'}
                alt={item.hotel_name}
                className="rounded-lg hover:shadow-xl md:w-full md:h-[30vh] h-[20vh] w-[30vw]"
              />
              

                <div className="flex flex-col justify-between ">
                  <div>
                  <h2 className="font-medium px-2 text-lg md:text-xl mt-1">{item.hotel_name}</h2>
                  </div>
                  <div className='mb-1 md:mt-3'>
                  <h2 className="text-xs md:text-sm font-semibold">💰 {item?.price}</h2>
                  <h2 className="text-xs md:text-sm font-semibold">⭐ {item?.rating}</h2>
                  </div>
                </div>
              
            </div>

            <div className="flex flex-row mt-2">
              <p>📍</p>
              <h2 className="text-sm font-semibold text-left px-1">
                {item.hotel_address}
              </h2>
            </div>
          </div>

        ))}

      </div>
    </div>
  );
}

export default Hotels;
