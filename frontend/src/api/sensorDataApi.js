export const getSensorData = async () => {
  const response = await axios.get('http://wildfireeye.onrender.com/api/firebase/monitoring');
  return response.data;
};