import React, { useEffect, useState } from 'react';
import { getAlerts, confirmAlert } from '../api/alertApi';

const SystemAlert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const result = await getAlerts();
      setAlerts(result);
    };
    fetchAlerts();
  }, []);

  const handleConfirm = async (id) => {
    await confirmAlert(id);
    setAlerts(alerts.map(a => a._id === id ? { ...a, confirmed: true } : a));
  };

  return (
    <div className="container">
      <h2>System Alerts</h2>
      <ul>
        {alerts.map(alert => (
          <li key={alert._id}>
            Location: {alert.gps}, Temp: {alert.temperature}, CO2: {alert.co2Level}, Confirmed: {alert.confirmed ? 'Yes' : 'No'}
            {!alert.confirmed && <button onClick={() => handleConfirm(alert._id)}>Confirm</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemAlert;