import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sensorData } from '../mock/mockData';



const MonitoringDetail = () => {
  const { id } = useParams();
  
  const filteredData = sensorData.filter(d => d.sensorId === id); 
  
  if (filteredData.length === 0) {
    return <div>No monitoring data found for sensor ID {id}</div>;
  }

  return (
    <div className="container">
      <h2>Sensor Monitoring – ID: {id}</h2>
      <table>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>GPS</th>
            <th>Temperature</th>
            <th>CO2 Level</th>
            <th>Humidity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{item.gps}</td>
              <td>{item.temperature} F°</td>
              <td>{item.co2Level} ppm</td>
              <td>{item.humidity}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/dashboard" className="gray-button">← Back</Link>
    </div>
  );
};

export default MonitoringDetail;