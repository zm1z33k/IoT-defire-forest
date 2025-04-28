import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault(); // ⬅️ Вот это ОЧЕНЬ важно
  try {
    const res = await axios.post('http://localhost:5001/api/auth/login', {
      email,
      password
    });
    console.log(res.data);
    // Если успешно — редиректим
    navigate('/dashboard');
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert('Invalid credentials');
  }
};

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;