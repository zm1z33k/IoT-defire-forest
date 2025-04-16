import React from 'react';
import { useParams, Link } from 'react-router-dom';

const AlertDetail = () => {
  const { id } = useParams();

  const mockAlerts = [
    {
      _id: '1',
      type: 'Fire hazard',
      id: '56789046',
      dateTime: '31.03.2025 10:00',
      gps: '50.880078, 14.249905',
      temperature: '56 F°',
      humidity: '10%',
      co2Level: '15 ppm',
      status: 'Active',
      description: 'Fire detected near sensor #23 in forest area.',
    },
    {
      _id: '2',
      type: 'Suspected fire',
      id: '56789047',
      dateTime: '31.03.2025 10:05',
      gps: '50.880078, 14.249905',
      temperature: '61 F°',
      humidity: '12%',
      co2Level: '680 ppm',
      status: 'Confirmed...',
      description: 'High CO2 level and temperature spike detected.',
    },
    {
      _id: '3',
      type: 'System error',
      id: '56789048',
      dateTime: '31.03.2025 10:10',
      gps: '50.880078, 14.249905',
      temperature: 'N/A',
      humidity: 'N/A',
      co2Level: 'N/A',
      status: 'Sensor failure',
      description: 'Sensor not responding. Possible hardware issue.',
    }
  ];

  // Найдём alert по ID из URL
  const alert = mockAlerts.find(a => a._id === id);

  // Если не найден — сообщение
  if (!alert) {
    return <div>Alert not found</div>;
  }

  return (
    <div className="container">
      <h2>Alert Detail</h2>
      <p><strong>Type:</strong> {alert.type}</p>
      <p><strong>ID:</strong> {alert.id}</p>
      <p><strong>Date/Time:</strong> {alert.dateTime}</p>
      <p><strong>GPS:</strong> {alert.gps}</p>
      <p><strong>Temperature:</strong> {alert.temperature}</p>
      <p><strong>Humidity:</strong> {alert.humidity}</p>
      <p><strong>CO2 Level:</strong> {alert.co2Level}</p>
      <p><strong>Status:</strong> {alert.status}</p>
      <p><strong>Description:</strong> {alert.description}</p>
      <br />
      <Link to="/" className="gray-button">← Back</Link>
    </div>
  );
};

export default AlertDetail;