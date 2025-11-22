import axios from 'axios';

const API_URL = 'https://digimon-api.vercel.app/api/digimon';

export default {
    async getAllDigimons() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching all digimons:', error);
            throw error;
        }
    },

    async getDigimonsByName(name) {
        try {
            const response = await axios.get(`${API_URL}/name/${name}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching digimon by name ${name}:`, error);
            throw error;
        }
    },

    async getDigimonsByLevel(level) {
        try {
            const response = await axios.get(`${API_URL}/level/${level}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching digimons by level ${level}:`, error);
            throw error;
        }
    }
};
