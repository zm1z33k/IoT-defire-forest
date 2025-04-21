import axios from 'axios';

axios.get(`${process.env.REACT_APP_API_URL}/api/sensors`)
const API_URL = 'http://localhost:5001/api/sensors';

export const getSensorData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};