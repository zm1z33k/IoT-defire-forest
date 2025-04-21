// SystemAlert.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SystemAlert.css';
import { alerts as mockAlerts } from '../mock/mockData';

const SystemAlert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAlerts(mockAlerts);
    }, 300);
  }, []);

  const handleConfirm = (id) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert._id === id ? { ...alert, confirmed: true, status: 'Confirmed...' } : alert
      )
    );
  };

  return (
    <div className="system-alert-container">
      <h2>System Alert</h2>
      <div className="grid">
        {alerts.map(alert => (
          <div key={alert._id} className="card">
            <p><strong>{alert.type}</strong> ID {alert.sensorId}</p>
            <p><strong>Date/Time</strong><br />{new Date(alert.dateTime).toLocaleString()}</p>
            <p><strong>GPS</strong><br />{alert.gps.join(', ')}</p>
            <p><strong>t°</strong><br />{alert.temperature} °C</p>
            <p><strong>Humidity</strong><br />{alert.humidity} %</p>
            <p><strong>CO2</strong><br />{alert.co2Level} ppm</p>
            <p><strong>System status</strong><br />{alert.status}</p>

            <div className="button-group">
              {!alert.confirmed ? (
                <>
                  <Link to={`/alerts/${alert._id}`} className="gray-button">More</Link>
                  <button className="gray-button" onClick={() => handleConfirm(alert._id)}>Confirm</button>
                  <button className="gray-button">Ignore</button>
                </>
              ) : (
                <Link to={`/alerts/${alert._id}`} className="gray-button">Read More</Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemAlert;