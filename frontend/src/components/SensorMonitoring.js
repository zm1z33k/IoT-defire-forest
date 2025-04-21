import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sensorData } from '../mock/mockData';

const SensorMonitoring = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData(sensorData);
    }, 500);
  }, []);

  return (
    <div className="container">
      <h2>Sensor Monitoring</h2>
      <table>
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
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <Link to={`/monitoring/${item.sensorId}`} className="link">
                  {item.sensorId}
                </Link>
              </td>
              <td>{item.gps.join(', ')}</td>
              <td>{item.temperature} °C</td>
              <td>{item.co2Level} ppm</td>
              <td>{item.humidity} %</td>
              <td>{item.status || 'N/A'}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorMonitoring;