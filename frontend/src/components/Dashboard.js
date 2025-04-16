import React from 'react';
import '../styles/Dashboard.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const data = [
  {
    dateTime: '31.03.2025 10:00',
    gps: '50.880078, 14.249905',
    temperature: '56 F°',
    humidity: '10%',
    status: 'Operational / Error',
  },
  {
    dateTime: '31.03.2025 10:05',
    gps: '50.880078, 14.249905',
    temperature: '56 F°',
    humidity: '10%',
    status: 'Operational / Error',
  },
  {
    dateTime: '31.03.2025 10:10',
    gps: '50.880078, 14.249905',
    temperature: '56 F°',
    humidity: '10%',
    status: 'Operational / Error',
  },
  {
    dateTime: '31.03.2025 10:15',
    gps: '50.880078, 14.249905',
    temperature: '56 F°',
    humidity: '10%',
    status: 'Operational / Error',
  },
  // přidej více podle potřeby
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="grid">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <p><strong>Date/Time</strong><br />{item.dateTime}</p>
            <p><strong>GPS</strong><br />{item.gps}</p>
            <p><strong>t°</strong><br />{item.temperature}</p>
            <p><strong>Humidity</strong><br />{item.humidity}</p>
            <p><strong>System status</strong><br />{item.status}</p>
            <Link to="/monitoring" className="more-button">
  More
</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;