import axios from 'axios';

const fetchHotel = async (name) => {
    const key=import.meta.env.VITE_HOTEL_API;
    
    const options = {
        method: 'POST',
        url: 'https://google-api31.p.rapidapi.com/imagesearch',
        headers: {
            'x-rapidapi-key': key,
            'x-rapidapi-host': 'google-api31.p.rapidapi.com',
            'Content-Type': 'application/json',
        },
        data: {
            text: name,
            safesearch: 'off',
            region: 'wt-wt',
            color: '',
            size: '',
            type_image: '',
            layout: '',
            max_results: 2,
        },
    };

    try {
        const response = await axios.request(options);
        console.log("fetched");
        return response.data.result; // Return the result
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
};

export default fetchHotel;