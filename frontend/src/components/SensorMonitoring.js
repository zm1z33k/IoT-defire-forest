import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import '../styles.css';



const sensorIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1397/1397898.png',
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

const SensorMonitoring = () => {
  const [sensorData, setSensorData] = useState([]);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    axios
      .get('https://wildfireeye.onrender.com/api/firebase/monitoring')
      .then((res) => setSensorData(res.data))
      .catch((err) => console.error('Sensor data error:', err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Sensor Monitoring</h2>
        <div className="button-group">
          <button onClick={() => setShowMap(!showMap)} className="button">
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
      </div>

      {showMap && (
        <div className="dashboard-map-full">
          <MapContainer center={[50.880078, 14.249905]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <FixMapSize />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {sensorData.map((sensor) => (
              <Marker key={sensor._id}
                position={sensor.gps}
                icon={sensorIcon}
                pathOptions={{
                  color: '#64829B',
                  fillColor: '#A0C4DC',
                  fillOpacity: 0.9,
                  weight: 2,
                }}
                ref={(el) => {
                  if (el) markerRefs.current[sensor._id] = el;
                }}>
                <Popup>
                  <strong>{sensor.sensorId}</strong>
                  <br />🌡 Temp: {sensor.temperature} °C
                  <br />💧 Humidity: {sensor.humidity} %
                  <br />🟤 CO₂: {sensor.co2Level} ppm
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      <section>
        <h3>📊 Sensor Data Table</h3>
        <div className="table-wrapper">
          <table className="sensor-table">
            <thead>
              <tr>
                <th>Sensor ID</th>
                <th>GPS Coordinates</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>CO₂ Level</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((sensor) => (
                <tr key={sensor._id}>
                  <td>
                    <Link to={`/monitoring/${sensor.sensorId}`} className="sensor-link">
                      {sensor.sensorId}
                    </Link>
                  </td>
                  <td>{sensor.gps.join(', ')}</td>
                  <td className="temp-value">{sensor.temperature} °C</td>
                  <td className="humidity-value">{sensor.humidity} %</td>
                  <td className="co2-value">{sensor.co2Level} ppm</td>
                  <td className="date-value">{new Date(sensor.dateTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SensorMonitoring;
