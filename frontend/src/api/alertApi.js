import axios from 'axios';

axios.get('http://localhost:5001/api/alerts');
const API_URL = 'http://localhost:5001/api/alerts';

export const getAlerts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const confirmAlert = async (id) => {
  await axios.put(`${API_URL}/${id}/confirm`);
};