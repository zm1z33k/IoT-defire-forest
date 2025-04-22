import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { alerts } from '../mock/mockData';

const AlertDetail = () => {
  const { id } = useParams();
  const alert = alerts.find(a => a._id === id);

  if (!alert) {
    return <div>Alert not found</div>;
  }

  return (
    <div className="alert-detail-wrapper">
      <h2>Alert Detail</h2>
      <p><strong>Type:</strong> {alert.type}</p>
      <p><strong>ID:</strong> {alert.sensorId}</p>
      <p><strong>Date/Time:</strong> {new Date(alert.dateTime).toLocaleString()}</p>
      <p><strong>GPS:</strong> {alert.gps.join(', ')}</p>
      <p><strong>Temperature:</strong> {alert.temperature} °C</p>
      <p><strong>Humidity:</strong> {alert.humidity} %</p>
      <p><strong>CO2 Level:</strong> {alert.co2Level} ppm</p>
      <p><strong>Status:</strong> {alert.status}</p>
      <p><strong>Description:</strong> {alert.description}</p>

      <div className="button-group">
        <Link to="/dashboard" className="gray-button">← Back</Link>
        <Link to={`/monitoring/${alert.sensorId}`} className="gray-button">View Monitoring</Link>
      </div>
    </div>
  );
};

export default AlertDetail;