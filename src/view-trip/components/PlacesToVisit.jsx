import React, { useEffect } from 'react'
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({trip}) {
    const itinerary=trip?.itineraryData?.itinerary;
  return (
    <div className='my-8'>
    <h2 className='font-bold text-xl'>Places to Visit</h2>
    <div className='my-4'>
      {
        itinerary &&
        itinerary.map((item,index)=>(
          <div key={index} className='mt-5'>
          <h2 className='font-medium text-lg'>{item.day}</h2>
          <div className='grid md:grid-cols-2 gap-5'>
          {
            item.plan.map((place,i)=>(
              <div key={i}>
              <h2>{place.time}</h2>
              <PlaceCardItem place={place} trip={trip}/>
              </div>
            ))
          }
          </div>
          </div>
          
        ))
     
      }
    </div>
    
  </div>
  )
}

export default PlacesToVisit