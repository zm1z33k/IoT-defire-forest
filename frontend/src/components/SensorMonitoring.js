import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
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

const SensorMonitoring = () => {
  const [sensorData, setSensorData] = useState([]);
  const [sortOption, setSortOption] = useState('recent');
  const [showMap, setShowMap] = useState(true);
  const markerRefs = useRef({});

  useEffect(() => {
  axios
    .get('https://wildfireeye.onrender.com/api/sensors')
  .then((res) => {
    console.log("🔎 Первый объект:", res.data[0]);
    setSensorData(res.data);
    })
    .catch((err) => console.error('Sensor data error:', err));
}, []);

  const sortMap = {
    recent: (a, b) => new Date(b.dateTime) - new Date(a.dateTime),
    oldest: (a, b) => new Date(a.dateTime) - new Date(b.dateTime),
    tempAsc: (a, b) => a.temperature - b.temperature,
    tempDesc: (a, b) => b.temperature - a.temperature,
    co2Asc: (a, b) => a.co2Level - b.co2Level,
    co2Desc: (a, b) => b.co2Level - a.co2Level,
    humidityAsc: (a, b) => a.humidity - b.humidity,
    humidityDesc: (a, b) => b.humidity - a.humidity,
  };

  const sortedData = [...sensorData].sort(sortMap[sortOption] || (() => 0));

  return (
    <div className="sensor-container">
      <h2>Sensor Monitoring</h2>

      <div className="button-group">
        <button className="button" onClick={() => setShowMap(prev => !prev)}>
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>

      {showMap && (
        <div className="dashboard-map-full">
          <MapContainer center={[50.088, 14.42076]} zoom={8} scrollWheelZoom={false} className="leaflet-container">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {sortedData.map((sensor) => {
              const key = sensor._id || `${sensor.sensorId}-${sensor.dateTime}`;
              return (
                <Marker
                  key={key}
                  position={Array.isArray(sensor.gps) ? sensor.gps : [0, 0]}
                  icon={sensorIcon}
                  ref={(el) => {
                    if (el) markerRefs.current[key] = el;
                  }}
                >
                  <Popup>
                    <strong>{sensor.sensorId}</strong><br />
                    🌡 Temp: {sensor.temperature ?? 'N/A'} °C<br />
                    💧 Humidity: {sensor.humidity ?? 'N/A'} %<br />
                    🟤 CO₂: {sensor.co2Level ?? 'N/A'} ppm
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}

      <div className="sort-panel">
        <label>Sort by:</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="recent">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="tempAsc">Temperature: Low to High</option>
          <option value="tempDesc">Temperature: High to Low</option>
          <option value="co2Asc">CO2: Low to High</option>
          <option value="co2Desc">CO2: High to Low</option>
          <option value="humidityAsc">Humidity: Low to High</option>
          <option value="humidityDesc">Humidity: High to Low</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="sensor-table">
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>GPS Coordinates</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>CO₂ Level</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
  {sortedData.map((sensor) => {
    const key = sensor._id || `${sensor.sensorId}-${sensor.dateTime}`;
    return (
      <tr
        key={key}
        onMouseEnter={() => {
          const marker = markerRefs.current[key];
          if (marker) marker.setOpacity(0.5);
        }}
        onMouseLeave={() => {
          const marker = markerRefs.current[key];
          if (marker) marker.setOpacity(1);
        }}
      >
        <td>
          <Link to={`/monitoring/${sensor.sensorId}`} className="sensor-link">
            {sensor.sensorId}
          </Link>
        </td>
        <td>{sensor.gps && Array.isArray(sensor.gps) ? sensor.gps.join(', ') : 'N/A'}</td>
        <td>{sensor.temperature ?? 'N/A'} °C</td>
        <td>{sensor.humidity ?? 'N/A'} %</td>
        <td>{sensor.co2Level ?? 'N/A'} ppm</td>
        <td>{sensor.dateTime ? new Date(sensor.dateTime).toLocaleString() : 'N/A'}</td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorMonitoring;