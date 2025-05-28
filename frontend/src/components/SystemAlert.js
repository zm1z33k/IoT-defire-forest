// 📁 components/SystemAlert.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';

const SystemAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    axios.get('https://wildfireeye.onrender.com/api/alerts')
      .then(res => setAlerts(res.data))
      .catch(err => console.error('Failed to fetch alerts:', err));
  }, []);

  const handleConfirm = async (id) => {
    try {
      await axios.patch(`https://wildfireeye.onrender.com/api/alerts/${id}/confirm`);
      setAlerts(prev => prev.map(a => a._id === id ? { ...a, confirmed: true, status: 'Confirmed' } : a));
    } catch (err) {
      console.error('Error confirming alert:', err);
    }
  };

  const handleArchive = async (id) => {
    try {
      await axios.patch(`https://wildfireeye.onrender.com/api/alerts/${id}/archive`);
      setAlerts(prev => prev.map(a => a._id === id ? { ...a, archived: true, status: 'Archived' } : a));
    } catch (err) {
      console.error('Failed to archive alert:', err);
    }
  };

  const filteredAlerts = alerts.filter(alert => showArchive ? alert.archived : !alert.archived);

  return (
    <div className="system-alert-container">
      <h2>System Alerts</h2>

      <div className="filter-toggle">
        <button onClick={() => setShowArchive(false)} className={!showArchive ? 'active' : ''}>Active</button>
        <button onClick={() => setShowArchive(true)} className={showArchive ? 'active' : ''}>Archived</button>
      </div>

      <div className="grid">
        {filteredAlerts.map(alert => (
          <div key={alert._id} className={`card alert-card ${alert.status.toLowerCase()}`}>
            <p><strong>{alert.type}</strong> (ID: {alert.sensorId})</p>
            <p><strong>Date:</strong> {new Date(alert.dateTime).toLocaleString()}</p>
            <p><strong>GPS:</strong> {alert.gps?.join(', ') || '–'}</p>
            <p><strong>🌡 Temp:</strong> {alert.temperature ?? alert.value ?? '–'} °C</p>
            <p><strong>💧 Humidity:</strong> {alert.humidity ?? alert.value ?? '–'} %</p>
            <p><strong>🚴 CO2:</strong> {alert.co2Level ?? alert.value ?? '–'} ppm</p>
            <p><strong>Status:</strong> {alert.status}</p>

            <div className="button-group">
              <Link to={`/alerts/${alert._id}`} className="gray-button">{alert.confirmed ? 'Read More' : 'More'}</Link>
              {!alert.confirmed && <button className="gray-button" onClick={() => handleConfirm(alert._id)}>Confirm</button>}
              {!alert.archived && <button className="gray-button" onClick={() => handleArchive(alert._id)}>Archive</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemAlert;