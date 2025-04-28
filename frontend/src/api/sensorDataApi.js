export const getSensorData = async () => {
  const response = await axios.get('http://localhost:5001/api/firebase/monitoring');
  return response.data;
};