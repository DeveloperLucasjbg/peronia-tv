import axios from 'axios';

export const getRiskService = async () => {
  try {
    const response = await axios.get('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo');
    return response.data;
  } catch (error) {
    console.error('Error fetching risk service:', error);
    return null;
  }
};