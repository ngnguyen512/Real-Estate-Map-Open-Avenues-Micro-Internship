import axios from 'axios';

const API_KEY = 'AIzaSyBZSfMh1n_pFbVEVasJ-7cRkuSNXoyKDe4'; // Ensure you use environment variables for API keys

export const geocodeAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.results[0].geometry.location; // returns latitude and longitude
        } else {
            throw new Error('Geocoding failed: ' + response.data.status);
        }
    } catch (error) {
        console.error('Geocoding error: ', error);
        throw error; // re-throw the error if necessary
    }
};