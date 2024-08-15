import axios from 'axios';

export const inflacionService = async () => {
  try {
    const response = await axios.get('https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual');
    return response.data;
  } catch (error) {
    console.error('Error fetching inflacion service:', error);
    return null;
  }
};