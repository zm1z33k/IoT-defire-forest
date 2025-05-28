import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
      .get('https://wildfireeye.onrender.com/api/firebasedata/monitoring')
      .then((res) => setSensorData(res.data))
      .catch((err) => console.error('Sensor data error:', err));
  }, []);

  const sortData = (data, option) => {
    const sorted = [...data];
    switch (option) {
      case 'recent': return sorted.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      case 'oldest': return sorted.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      case 'tempAsc': return sorted.sort((a, b) => a.temperature - b.temperature);
      case 'tempDesc': return sorted.sort((a, b) => b.temperature - a.temperature);
      case 'co2Asc': return sorted.sort((a, b) => a.co2Level - b.co2Level);
      case 'co2Desc': return sorted.sort((a, b) => b.co2Level - a.co2Level);
      case 'humidityAsc': return sorted.sort((a, b) => a.humidity - b.humidity);
      case 'humidityDesc': return sorted.sort((a, b) => b.humidity - a.humidity);
      default: return sorted;
    }
  };

  const sortedData = sortData(sensorData, sortOption);

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
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {sensorData.map((sensor) => (
              <Marker
                key={sensor._id}
                position={sensor.gps}
                icon={sensorIcon}
                ref={(el) => {
                  if (el) markerRefs.current[sensor._id] = el;
                }}
              >
                <Popup>
                  <strong>{sensor.sensorId}</strong><br />
                  🌡 Temp: {sensor.temperature} °C<br />
                  💧 Humidity: {sensor.humidity} %<br />
                  🟤 CO₂: {sensor.co2Level} ppm
                </Popup>
              </Marker>
            ))}
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
            {sortedData.map((sensor) => (
              <tr
                key={sensor._id}
                onMouseEnter={() => {
                  const marker = markerRefs.current[sensor._id];
                  if (marker) marker.setOpacity(0.5);
                }}
                onMouseLeave={() => {
                  const marker = markerRefs.current[sensor._id];
                  if (marker) marker.setOpacity(1);
                }}
              >
                <td>
                  <Link to={`/monitoring/${sensor.sensorId}`} className="sensor-link">
                    {sensor.sensorId}
                  </Link>
                </td>
                <td>{sensor.gps.join(', ')}</td>
                <td>{sensor.temperature} °C</td>
                <td>{sensor.humidity} %</td>
                <td>{sensor.co2Level} ppm</td>
                <td>{new Date(sensor.dateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorMonitoring;