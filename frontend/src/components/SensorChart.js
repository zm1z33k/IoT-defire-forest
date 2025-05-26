import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const SensorChart = ({ data }) => {
  const [showTemp, setShowTemp] = useState(true);
  const [showCO2, setShowCO2] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);
  const [chartType, setChartType] = useState('line');

  if (!data || data.length === 0) {
    return <p style={{ textAlign: 'center', padding: '1rem' }}>No data available for chart</p>;
  }

  const formattedData = data.map(item => ({
    ...item,
    time: new Date(item.dateTime).toLocaleString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
  }));

  const renderLines = () => (
    <>
      {showTemp && <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />}
      {showCO2 && <Line type="monotone" dataKey="co2Level" stroke="#3cbc00" name="CO₂ (ppm)" />}
      {showHumidity && <Line type="monotone" dataKey="humidity" stroke="#8884d8" name="Humidity (%)" />}
    </>
  );

  const renderBars = () => (
    <>
      {showTemp && <Bar dataKey="temperature" fill="#ff7300" name="Temperature (°C)" />}
      {showCO2 && <Bar dataKey="co2Level" fill="#3cbc00" name="CO₂ (ppm)" />}
      {showHumidity && <Bar dataKey="humidity" fill="#8884d8" name="Humidity (%)" />}
    </>
  );

  return (
    <div className="sensor-chart-container">
      <h4>📊 Sensor Chart</h4>
      <div className="chart-controls">
        <label><input type="checkbox" checked={showTemp} onChange={() => setShowTemp(!showTemp)} /> Temp</label>
        <label><input type="checkbox" checked={showCO2} onChange={() => setShowCO2(!showCO2)} /> CO₂</label>
        <label><input type="checkbox" checked={showHumidity} onChange={() => setShowHumidity(!showHumidity)} /> Humidity</label>
        <label style={{ marginLeft: '2rem' }}>Chart Type:</label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="line">Line</option>
          <option value="bar">Bar</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'line' ? (
          <LineChart data={formattedData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            {renderLines()}
          </LineChart>
        ) : (
          <BarChart data={formattedData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            {renderBars()}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
