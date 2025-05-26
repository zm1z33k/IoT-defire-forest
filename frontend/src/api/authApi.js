import axios from 'axios';

axios.post('http://wildfireeye.onrender.com/api/auth/login');
const API_URL = 'http://wildfireeye.onrender.com/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};