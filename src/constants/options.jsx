export const SelectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler on an exploration journey',
        icon: '✈️',
        people: '1',
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: '👫',
        people: '2',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers',
        icon: '👪',
        people: '3 to 5',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thill-seekers',
        icon: '🛳️',
        people: '6 to 10',
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💸',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep costs on the average side',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don\'t worry about cost',
        icon: '💵',
    },
];

export const AI_HOTEL_PROMPT='Generate Travel Plan for Location : {location} for {totalDays} Days for {traveler} people with a {budget} budget, Give me a Hotels options list with HotelName,Hotel address,Price, hotel image url,geo coordinates,rating,descriptions  in correct JSON format'
export const AI_ITI_PROMPT='Generate itinerary plan for location: {location} for {totalDays} Days for {traveler} people with a {budget} budget,suggest itinerary list of objects where each object contain day and plan with placeName,Place Details,ticket Pricing,rating,Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'