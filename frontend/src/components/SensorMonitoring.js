import React, { useEffect, useState } from 'react';

const mockData = [
  {
    _id: '1',
    temperature: 28.3,
    co2Level: 480,
    humidity: 35,
    gps: '50.880078, 14.249905',
    createdAt: '2025-04-16T09:00:00Z'
  },
  {
    _id: '2',
    temperature: 30.1,
    co2Level: 530,
    humidity: 40,
    gps: '50.880078, 14.249905',
    createdAt: '2025-04-16T09:05:00Z'
  },
  {
    _id: '3',
    sensorId: 'sensor_3',
    gps: '50.880078, 14.249905',
    temperature: 29.7,
    co2Level: 505,
    humidity: 38,
    systemStatus: 'Operational',
    createdAt: '2025-04-16T09:10:00Z'
  }
];

const SensorMonitoring = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // эмулируем загрузку данных
    setTimeout(() => {
      setData(mockData);
    }, 500); // имитируем небольшую задержку
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
              <td>{item.sensorId || item._id}</td>
              <td>{item.gps}</td>
              <td>{item.temperature} °C</td>
              <td>{item.co2Level} ppm</td>
              <td>{item.humidity} %</td>
              <td>{item.systemStatus || 'N/A'}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorMonitoring;