import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import '../styles/MapPage.css'; // Import your CSS file for styling

const mockAlerts = [
  {
    _id: '1',
    id: '456768546',
    gps: [36.578581, -118.292297],
    temperature: '56 F°',
    humidity: '10%',
    dateTime: '31.03.2025 10:00',
    status: 'Operational / Error',
  },
  {
    _id: '2',
    id: '868675456',
    gps: [36.6, -118.3],
    temperature: '56 F°',
    humidity: '10%',
    dateTime: '31.03.2025 10:00',
    status: 'Operational / Error',
  },
  {
    _id: '3',
    id: '678909876',
    gps: [36.55, -118.33],
    temperature: '56 F°',
    humidity: '10%',
    dateTime: '31.03.2025 10:00',
    status: 'Operational / Error',
  },
  {
    _id: '4',
    id: '456765342',
    gps: [36.5, -118.2],
    temperature: '56 F°',
    humidity: '10%',
    dateTime: '31.03.2025 10:00',
    status: 'Operational / Error',
  },
];

// кастомная иконка
const fireIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/482/482523.png',
  iconSize: [32, 32],
});

const MapPage = () => {
  return (
    <div className="map-page">
      <div className="map-section">
        <MapContainer center={[36.57, -118.3]} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mockAlerts.map(alert => (
            <Marker key={alert._id} position={alert.gps} icon={fireIcon}>
              <Popup>Id {alert.id}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="sidebar">
        <h2>Map</h2>
        {mockAlerts.map(alert => (
          <div key={alert._id} className="alert-card">
            <p><strong>Date/Time</strong><br />{alert.dateTime}</p>
            <p><strong>GPS/ID</strong><br />{alert.gps.join(', ')} / {alert.id}</p>
            <p><strong>t°</strong><br />{alert.temperature}</p>
            <p><strong>Humidity</strong><br />{alert.humidity}</p>
            <p><strong>System status</strong><br />{alert.status}</p>
            <Link to={`/alerts/${alert._id}`} className="gray-button">More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;