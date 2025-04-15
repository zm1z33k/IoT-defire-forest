import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import SensorMonitoring from './components/SensorMonitoring';
import SystemAlert from './components/SystemAlert';
import MapView from './components/MapView';
import Settings from './components/Settings';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/monitoring" element={<SensorMonitoring />} />
        <Route path="/alerts" element={<SystemAlert />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;