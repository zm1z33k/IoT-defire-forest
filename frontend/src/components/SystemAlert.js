import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SystemAlert.css'; // Import your CSS file for styling

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
    confirmed: false,
  },
  {
    _id: '2',
    type: 'Suspected fire',
    id: '56789046',
    dateTime: '31.03.2025 10:00',
    gps: '50.880078, 14.249905',
    temperature: '56 F°',
    humidity: '10%',
    co2Level: '680 ppm',
    status: 'Confirmed...',
    confirmed: true,
  },
  // добавь больше при необходимости
];

const SystemAlert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAlerts(mockAlerts);
    }, 300);
  }, []);

  const handleConfirm = (id) => {
    setAlerts(alerts.map(alert =>
      alert._id === id ? { ...alert, confirmed: true, status: 'Confirmed...' } : alert
    ));
  };

  return (
    <div className="system-alert-container">
      <h2>System Alert</h2>
      <div className="grid">
        {alerts.map(alert => (
          <div key={alert._id} className="card">
            <p><strong>{alert.type}</strong>  ID {alert.id}</p>
            <p><strong>Date/Time</strong><br />{alert.dateTime}</p>
            <p><strong>GPS</strong><br />{alert.gps}</p>
            <p><strong>t°</strong><br />{alert.temperature}</p>
            <p><strong>Humidity</strong><br />{alert.humidity}</p>
            <p><strong>CO2</strong><br />{alert.co2Level}</p>
            <p><strong>System status</strong><br />{alert.status}</p>

            <div className="button-group">
              {!alert.confirmed ? (
                <>
                  <Link to={`/alerts/${alert._id}`} className="gray-button">More</Link>
                  <button className="gray-button" onClick={() => handleConfirm(alert._id)}>Confirm</button>
                  <button className="gray-button">Ignore</button>
                </>
              ) : (
                <button className="gray-button">Read More</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemAlert;