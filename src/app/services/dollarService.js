import axios from 'axios';

export const getDollarRates = async () => {
  try {
    const response = await axios.get('https://dolarapi.com/v1/dolares');
    return response.data;
  } catch (error) {
    console.error('Error fetching dollar rates:', error);
    return null;
  }
};