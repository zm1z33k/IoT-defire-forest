import axios from 'axios';

axios.post('http://localhost:5001/api/auth/login');
const API_URL = 'http://localhost:5001/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};