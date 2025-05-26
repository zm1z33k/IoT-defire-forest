import axios from 'axios';

const API_URL = 'http://wildfireeye.onrender.com/api/alerts';

export const getAlerts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const confirmAlert = async (id) => {
  await axios.put(`${API_URL}/${id}/confirm`);
};