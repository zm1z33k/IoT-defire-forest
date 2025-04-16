import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
    
            {/* {user && ( */}
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/monitoring">Monitoring</Link>
          <Link to="/alerts">Alerts</Link>
          <Link to="/map">Map</Link>
          {/* {user.role === 'admin' && <Link to="/register">Register User</Link>} */}
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      {/* )} */}
      {!user && <Link to="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;