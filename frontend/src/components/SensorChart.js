import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const SensorChart = ({ data }) => {
  const [showTemp, setShowTemp] = useState(true);
  const [showCO2, setShowCO2] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);

  if (!data || data.length === 0) {
    return <p style={{ textAlign: 'center', padding: '1rem' }}>No data available for chart</p>;
  }

  // Convert timestamps for better chart readability
  const formattedData = data.map(item => ({
    ...item,
    time: new Date(item.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }));

  return (
    <div className="sensor-chart-container">
      <h4>📊 Sensor Chart</h4>
      <div className="chart-controls">
        <label><input type="checkbox" checked={showTemp} onChange={() => setShowTemp(!showTemp)} /> Temp</label>
        <label><input type="checkbox" checked={showCO2} onChange={() => setShowCO2(!showCO2)} /> CO₂</label>
        <label><input type="checkbox" checked={showHumidity} onChange={() => setShowHumidity(!showHumidity)} /> Humidity</label>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {showTemp && <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°F)" />}
          {showCO2 && <Line type="monotone" dataKey="co2Level" stroke="#3cbc00" name="CO₂ (ppm)" />}
          {showHumidity && <Line type="monotone" dataKey="humidity" stroke="#8884d8" name="Humidity (%)" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;