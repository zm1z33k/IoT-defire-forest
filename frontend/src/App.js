import React from 'react';
import 'leaflet/dist/leaflet.css';
import '../src/styles.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import SensorMonitoring from './components/SensorMonitoring';
import SystemAlert from './components/SystemAlert';
import MonitoringDetail from './components/MonitoringDetail';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import AlertDetail from './components/AlertDetail';


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/monitoring" element={<SensorMonitoring />} />
        <Route path="/alerts" element={<SystemAlert />} />
        <Route path="/alerts/:id" element={<AlertDetail />} />
        <Route path="/monitoring/:id" element={<MonitoringDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;