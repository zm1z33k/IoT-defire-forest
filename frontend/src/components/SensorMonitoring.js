import React, { useEffect, useState } from 'react';
import { getSensorData } from '../api/sensorDataApi';

const SensorMonitoring = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSensorData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Sensor Monitoring</h2>
      <table>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>CO2 Level</th>
            <th>Humidity</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.temperature}</td>
              <td>{item.co2Level}</td>
              <td>{item.humidity}</td>
              <td>{item.gps}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorMonitoring;