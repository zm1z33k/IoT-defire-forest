export const sensorData = [
  {
    _id: '1',
    sensorId: 'A23',
    gps: [50.880078, 14.249905],
    temperature: 56,
    humidity: 10,
    co2Level: 15,
    status: 'Active',
    createdAt: '2025-04-16T10:00:00Z'
  },
  {
    _id: '2',
    sensorId: 'A24',
    gps: [50.882000, 14.251000],
    temperature: 57,
    humidity: 12,
    co2Level: 20,
    status: 'Stable',
    createdAt: '2025-04-16T10:10:00Z'
  },
  {
    _id: '3',
    sensorId: 'A25',
    gps: [50.879500, 14.246500],
    temperature: 60,
    humidity: 13,
    co2Level: 35,
    status: 'Rising',
    createdAt: '2025-04-16T10:20:00Z'
  },
  {
    _id: '4',
    sensorId: 'A26',
    gps: [50.881200, 14.253300],
    temperature: 62,
    humidity: 14,
    co2Level: 40,
    status: 'Warning',
    createdAt: '2025-04-16T10:30:00Z'
  }
];

export const alerts = [
  {
    _id: 'A23',
    sensorId: 'A23',
    type: 'Fire hazard',
    status: 'Active',
    dateTime: '2025-04-16T10:00:00Z',
    gps: [50.880078, 14.249905],
    temperature: 56,
    humidity: 10,
    co2Level: 15,
    description: 'Fire detected near sensor A23 in forest area.'
  },
    {
    _id: 'A25',
    sensorId: 'A25',
    type: 'Suspected fire',
    status: 'Unconfirmed',
    dateTime: '2025-04-16T10:25:00Z',
    gps: [50.880100, 14.25090],
    temperature: 60,
    humidity: 13,
    co2Level: 35,
    description: 'Rising CO2 level and temperature suggest possible fire event.'
  },
  {
    _id: 'A26',
    sensorId: 'A26',
    type: 'Sensor warning',
    status: 'Unconfirmed',
    dateTime: '2025-04-16T10:30:00Z',
    gps: [50.880200, 14.250400],
    temperature: 62,
    humidity: 14,
    co2Level: 40,
    description: 'Sensor reporting abnormal values. Further investigation needed.'
  }
];