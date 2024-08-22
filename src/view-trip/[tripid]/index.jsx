import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import Footer from '../components/Footer';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import { toast } from 'react-toastify'; // Import toast

function ViewTrip() {
    const { tripid } = useParams();
    const [hotelData, setHotelData] = useState();
    const [itiData, setItiData] = useState();
    const [trip, setTrip] = useState();

    const GetTripData = async () => {
        try {
          const docRef = doc(db, "AiTrips", tripid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Get the document data
            const data = docSnap.data();
            setTrip(data)
            // Parse tripData if it's a JSON string; otherwise, use it directly
           /* const parsedData1 = {
              ...data,
              hotelData: typeof data.hotelData === 'string' ? JSON.parse(data.hotelData) : data.hotelData
            };
            const parsedData2 = {
              ...data,
              itineraryData: typeof data.itineraryData === 'string' ? JSON.parse(data.itineraryData) : data.itineraryData
            };
            setHotelData(parsedData1);
            setItiData(parsedData2);*/
          } else {
            console.log("No such document!");
            toast('No trip found!');
          }
          
        } catch (error) {
            console.error("Error fetching trip data:", error);
            toast.error('Error fetching trip data!');
        }
    };

    useEffect(() => {
        if (tripid) {
            GetTripData();
        }
    }, [tripid]);

    
    if (!trip) {
      return <div>Loading...</div>; // You can customize this loading state
    }
    //console.log(trip)
    //console.log(trip?.tripData?.hotel_options);
    /* <InfoSection trip={trip} />
            <Hotels trip={trip} />
            <PlacesToVisit trip={trip}/>
            <Footer trip={trip} /> */
    return (
        <div className='p-12 md:px-25 lg:px-44 xl:px:56'>
           <InfoSection trip={trip}/>
           <Hotels trip={trip}/>
           <PlacesToVisit trip={trip}/>
           <Footer />
        </div>
    );
}

export default ViewTrip;
