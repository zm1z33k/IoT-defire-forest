import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SensorChart from './SensorChart';

const MonitoringDetail = () => {
  const { id } = useParams();
  const [sensorData, setSensorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState('recent');
  const [timeRange, setTimeRange] = useState('24h');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение данных
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://wildfireeye.onrender.com/api/firebasedata/monitoring/${id}`
        );
        setSensorData(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sensor data:', err);
        setError('Failed to load sensor data');
        setLoading(false);
      }
    };

    fetchSensorData();
  }, [id]);

  // Фильтрация + сортировка
  useEffect(() => {
    const getTimeLimit = () => {
      const now = new Date();
      switch (timeRange) {
        case '24h':
          return new Date(now.getTime() - 24 * 60 * 60 * 1000);
        case '7d':
          return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case '30d':
          return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        default:
          return new Date(0);
      }
    };

    const timeFiltered = sensorData.filter(
      (entry) => new Date(entry.dateTime) >= getTimeLimit()
    );

    const sortMap = {
      recent: (a, b) => new Date(b.dateTime) - new Date(a.dateTime),
      oldest: (a, b) => new Date(a.dateTime) - new Date(b.dateTime),
      tempAsc: (a, b) => a.temperature - b.temperature,
      tempDesc: (a, b) => b.temperature - a.temperature,
      co2Asc: (a, b) => a.co2Level - b.co2Level,
      co2Desc: (a, b) => b.co2Level - a.co2Level,
    };

    const sorted = [...timeFiltered].sort(sortMap[sortOption]);
    setFilteredData(sorted);
  }, [sensorData, timeRange, sortOption]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="monitoring-detail">
      <h2>Sensor Monitoring Details for Sensor ID: {id}</h2>

      <div className="controls">
        <label htmlFor="timeRange">Time Range:</label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>

        <label htmlFor="sortOption">Sort By:</label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="tempAsc">Temperature: Low to High</option>
          <option value="tempDesc">Temperature: High to Low</option>
          <option value="co2Asc">CO₂ Level: Low to High</option>
          <option value="co2Desc">CO₂ Level: High to Low</option>
        </select>
      </div>

      <table className="sensor-table">
        <thead>
          <tr>
            <th>Sensor ID</th>
            <th>GPS</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>CO₂ Level</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(entry => (
              <tr key={entry.id || entry._id}>
                <td>{entry.sensorId || 'N/A'}</td>
                <td>
                  {Array.isArray(entry.gps)
                    ? entry.gps.join(', ')
                    : 'N/A'}
                </td>
                <td>{entry.temperature ?? 'N/A'} °C</td>
                <td>{entry.humidity ?? 'N/A'} %</td>
                <td>{entry.co2Level ?? 'N/A'} ppm</td>
                <td>{entry.dateTime ? new Date(entry.dateTime).toLocaleString() : 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <SensorChart data={filteredData} />
    </div>
  );
};

export default MonitoringDetail;