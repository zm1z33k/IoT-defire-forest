import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'technician'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      alert('User created');
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  return (
    <div className="container">
      <h2>Register New User (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="technician">Technician</option>
          <option value="operator">Operator</option>
          <option value="agency">Agency</option>
          <option value="fire">Fire Department</option>
          <option value="community">Community</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
