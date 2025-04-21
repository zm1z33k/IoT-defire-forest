// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Dashboard.css'; // Import your CSS file for styling
import { sensorData, alerts } from '../mock/mockData';

const latestSensorData = sensorData;
const mockAlerts = alerts;

const sensorIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1397/1397898.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const fireIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/785/785116.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const FixMapSize = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
};

const Dashboard = () => {
  const [mapPosition, setMapPosition] = useState('top'); 

  const renderMap = () => (
    <MapContainer center={[50.880078, 14.249905]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <FixMapSize />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {latestSensorData.map(sensor => (
        <Marker key={sensor._id} position={sensor.gps} icon={sensorIcon}>
          <Popup>
            Sensor {sensor._id}<br />
            Temp: {sensor.temperature} °C<br />
            CO2: {sensor.co2Level} ppm
          </Popup>
        </Marker>
      ))}
       {/* Алерты */}
    {alerts.map(alert => (
      <Marker key={alert._id} position={[alert.gps[0] + 0.001, alert.gps[1] + 0.001]} icon={fireIcon}>
        <Popup>
          <strong>{alert.type}</strong><br />
          Sensor: {alert.sensorId}<br />
          Status: {alert.status}
        </Popup>
      </Marker>
    ))}
    </MapContainer>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="map-toggle-group">
          <button onClick={() => setMapPosition('top')}>Top</button>
          <button onClick={() => setMapPosition('hidden')}>Hide</button>
        </div>
      </div>

      {mapPosition === 'top' && <div className="dashboard-map-full">{renderMap()}</div>}

      {mapPosition === 'right' ? (
        <div className="dashboard-layout">
          <div className="dashboard-main">
            <AlertsSection />
            <SensorDataSection />
          </div>
          <div className="dashboard-map-side">
            {renderMap()}
          </div>
        </div>
      ) : (
        <>
          <AlertsSection />
          <SensorDataSection />
        </>
      )}
    </div>
  );
};

const AlertsSection = () => (
  <section>
    <h3>🔥 Active Alerts</h3>
    {mockAlerts.length === 0 ? (
      <p>No active alerts</p>
    ) : (
      <div className="grid">
        {mockAlerts.map(alert => (
          <div className="card alert-card" key={alert._id}>
            <p><strong>Sensor:</strong> {alert.sensorId}</p>
            <p><strong>Type:</strong> {alert.type}</p>
            <p><strong>Status:</strong> {alert.status}</p>
            <p><strong>Time:</strong> {alert.dateTime}</p>
            <p><strong>GPS:</strong> {alert.gps.join(', ')}</p>
            <Link to={`/alerts/${alert._id}`} className="gray-button">More</Link>
          </div>
        ))}
      </div>
    )}
  </section>
);

const SensorDataSection = () => (
  <section>
    <h3>📈 Latest Sensor Data</h3>
    <div className="grid">
      {latestSensorData.map(sensor => (
        <div className="card" key={sensor._id}>
          <p><strong>Sensor ID:</strong> {sensor.sensorId}</p>
          <p><strong>GPS:</strong> {sensor.gps.join(', ')}</p>
          <p><strong>Temp:</strong> {sensor.temperature}°C</p>
          <p><strong>Humidity:</strong> {sensor.humidity}</p>
          <p><strong>CO2:</strong> {sensor.co2Level} ppm</p>
          <p><strong>Last updated:</strong><br />{new Date(sensor.createdAt).toLocaleString()}</p>
          <Link to={`/monitoring/${sensor.sensorId}`} className="gray-button">View Monitoring</Link>
        </div>
      ))}
    </div>
  </section>
);

export default Dashboard;
