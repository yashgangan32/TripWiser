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
    const [trip, setTrip] = useState();

    const GetTripData = async () => {
        try {
          const docRef = doc(db, "AiTrips", tripid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Get the document data
            const data = docSnap.data();
            setTrip(data)
          
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
