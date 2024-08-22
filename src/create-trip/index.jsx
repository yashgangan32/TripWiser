import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_HOTEL_PROMPT,AI_ITI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { chatSession } from "../service/AiModel"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false)

  const navigate=useNavigate()

  const handleInputChange = (name, value) => {

    setFormData(prevData => {
      const updatedData = { ...prevData, [name]: value };

      return updatedData;
    });
  };

  /*useEffect(() => {
    console.log("FormData from useEffect:", formData);
  }, [formData]);*/

  const OnGenerateTrip = async () => {
    if (formData?.noOfDays > 5) {
      toast.error("Max number of days is 5", {
        position: "top-center",
        autoClose: 1000
      });
      return;
    }
    //console.log(formData)
    setLoading(true);
    const FINAL_PROMPT1 = AI_HOTEL_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.travelWith)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    const FINAL_PROMPT2=AI_ITI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.travelWith)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)


    //console.log(FINAL_PROMPT1);
    //console.log(FINAL_PROMPT2);
    const result1 = await chatSession.sendMessage(FINAL_PROMPT1);
    const result2 = await chatSession.sendMessage(FINAL_PROMPT2);
    /*console.log("--",result1?.response?.text());
    console.log("--------------------------------------------");
    console.log("--",result2?.response?.text());*/
    setLoading(false)
    SaveAiTrip(result1?.response?.text(),result2?.response?.text())
  };

  const SaveAiTrip = async (hotelData,itiData) => {
    setLoading(true)
    const hd=JSON.parse(hotelData)
    const itd=JSON.parse(itiData)
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    const docRef = doc(db, "AiTrips", docId);
    await setDoc(docRef, {
      userSelection: formData,
      hotelData: hd,
      itineraryData: itd,
      userEmail: user?.email,
      id: docId
    });
    setLoading(false)
    navigate("/view-trip/"+docId)
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Share Your Travel Preferences with Us🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Simply provide some basic information, and our trip planner will
        generate a customized itinerary based on your preferences.
      </p>
      <div className="mt-16 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <Input
            placeholder='Place'
            value={place}
            onChange={(e) => {
              const value = e.target.value;
              //console.log("Place input change:", value);
              setPlace(value);
              handleInputChange("location", value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => {
              const value = Number(e.target.value);
              //console.log("Days input change:", value);
              handleInputChange("noOfDays", value);
            }}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl mt-10 mb-3 font-medium">
          What is your budget for the trip?
        </h2>
        <p className="text-gray-500 text-xl">
          The budget is exclusively allocated for activities and dining
          purposes.
        </p>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.budget === item.title && "border-blue-500 bg-blue-50 shadow-lg"}
                `}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travelWith", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.travelWith === item.people && "border-blue-500 bg-blue-50 shadow-lg"}
                `}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading className="h-7 w-7 animate-spin" /> : "Generate Trip"
            }


        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
