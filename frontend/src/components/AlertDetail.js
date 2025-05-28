// 📁 AlertDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const AlertDetail = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://wildfireeye.onrender.com/api/alerts')
      .then(res => {
        const found = res.data.find(a => a._id === id);
        setAlert(found || null);
      })
      .catch(err => console.error('Failed to load alert:', err));
  }, [id]);

  const confirmAlert = async () => {
    try {
      await axios.patch(`https://wildfireeye.onrender.com/api/alerts/${id}/confirm`);
      setAlert(prev => ({ ...prev, status: 'Confirmed', confirmed: true }));
    } catch (err) {
      console.error('Failed to confirm alert:', err);
    }
  };

  const handleArchive = async () => {
    try {
      await axios.patch(`https://wildfireeye.onrender.com/api/alerts/${id}/archive`);
      alert('Alert archived.');
      navigate('/alerts');
    } catch (err) {
      console.error('Failed to archive alert:', err);
    }
  };

  if (!alert) return <div className="alert-detail-wrapper"><h2>Alert not found</h2></div>; 

  return (
    <div className="alert-detail-wrapper">
      <h2 className="alert-heading">🚨 Alert Detail</h2>

      <div className={`alert-card status-${alert.status}`}>
        <p><strong>📌 Type:</strong> {alert.type}</p>
        <p><strong>🔖 ID:</strong> {alert.sensorId}</p>
        <p><strong>🕓 Date/Time:</strong> {new Date(alert.dateTime).toLocaleString()}</p>
        <p><strong>📍 GPS:</strong> {alert.gps.join(', ')}</p>
       <p><strong>🌡 Temp:</strong> {alert.temperature ?? alert.value ?? '–'} °C</p>
            <p><strong>💧 Humidity:</strong> {alert.humidity ?? alert.value ?? '–'} %</p>
            <p><strong>🚴 CO2:</strong> {alert.co2Level ?? alert.value ?? '–'} ppm</p>
        <p><strong>✅ Status:</strong> <span className={`status-label ${alert.status}`}>{alert.status}</span></p>
        <p><strong>📝 Description:</strong> {alert.description || '–'}</p>
      </div>

      <div className="button-group">
        <Link to="/alerts" className="button">← Back</Link>
        <Link to={`/monitoring/${alert.sensorId}`} className="button">View Monitoring</Link>
        {!alert.confirmed && (
          <button onClick={confirmAlert} className="button">Confirm</button>
        )}
        {!alert.archived && (
          <button onClick={handleArchive} className="gray-button">Archive</button>
        )}
      </div>
    </div>
  );
};

export default AlertDetail;