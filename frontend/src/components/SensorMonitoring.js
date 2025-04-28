import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SensorMonitoring.css';

const SensorMonitoring = () => {
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    axios.get('http://localhost:5001/api/firebasedata/monitoring')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
  const sortData = (data, option) => {
    const sorted = [...data];
    switch (option) {
      case 'recent':
        return sorted.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      case 'tempAsc':
        return sorted.sort((a, b) => a.temperature - b.temperature);
      case 'tempDesc':
        return sorted.sort((a, b) => b.temperature - a.temperature);
      case 'co2Asc':
        return sorted.sort((a, b) => a.co2Level - b.co2Level);
      case 'co2Desc':
        return sorted.sort((a, b) => b.co2Level - a.co2Level);
      case 'humidityAsc':
        return sorted.sort((a, b) => a.humidity - b.humidity);
      case 'humidityDesc':
        return sorted.sort((a, b) => b.humidity - a.humidity);
      default:
        return sorted;
    }
  };

   const sortedData = sortData(data, sortOption);

  return (
    <div className="sensor-container">
      <h2>Sensor Monitoring</h2>

       {/* 🔥 Сортировка */}
      <div className="sort-panel">
        <label>Sort by:</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="recent">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="tempAsc">Temperature: Low to High</option>
          <option value="tempDesc">Temperature: High to Low</option>
          <option value="co2Asc">CO2: Low to High</option>
          <option value="co2Desc">CO2: High to Low</option>
          <option value="humidityAsc">Humidity: Low to High</option>
          <option value="humidityDesc">Humidity: High to Low</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="sensor-table">
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>GPS Coordinates</th>
              <th>Temperature</th>
              <th>CO2 Level</th>
              <th>Humidity</th>
              <th>System Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
  {sortedData.map((item) => (   // ✅ ТУТ ДОЛЖНО БЫТЬ sortedData, а НЕ data
    <tr key={item._id}>
      <td>
        <Link to={`/monitoring/${item.sensorId}`} className="sensor-link">
          {item.sensorId}
        </Link>
      </td>
      <td>{item.gps.join(', ')}</td>
      <td>{item.temperature} °F</td>
      <td>{item.co2Level} ppm</td>
      <td>{item.humidity} %</td>
      <td>{item.status || 'N/A'}</td>
      <td>{new Date(item.dateTime).toLocaleString()}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorMonitoring;