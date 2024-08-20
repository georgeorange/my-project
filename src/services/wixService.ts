import axios from 'axios';

const WIX_API_URL = 'https://sharanya-adam.com/_functions/get_import_data';

export const fetchImportData = async () => {
    try {
        const response = await axios.get(WIX_API_URL);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};
