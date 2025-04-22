import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sensorData } from '../mock/mockData';
import '../styles/MonitoringDetail.css';


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
            <th>GPS Coordinates</th>
              <th>Temperature</th>
              <th>CO2 Level</th>
              <th>Humidity</th>
              <th>System Status</th>
              <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.gps.join(', ')}</td>
                <td>{item.temperature} °F</td>
                <td>{item.co2Level} ppm</td>
                <td>{item.humidity} %</td>
                <td>{item.status || 'N/A'}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default MonitoringDetail;