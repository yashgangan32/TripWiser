import axios from 'axios';

const fetchslider = async (name) => {
    const key=import.meta.env.VITE_IMAGE_API_SLIDER;

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
            max_results: 5,
        },
    };
    try {
        const response = await axios.request(options);
        return response.data.result; // Return the result
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
};

export default fetchslider;
