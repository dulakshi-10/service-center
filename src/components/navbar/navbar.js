import React from 'react';
import { useLocation } from 'react-router-dom';
import { removeToken } from '../../utils/session'; // Import the session utility
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; // Import UserContext

import './navbar.css';

const Navbar = () => {
  const location = useLocation(); // 👈 get current route
  const navigate = useNavigate();
  const { user } = useUser();
  
  const onLogout = () => {
    removeToken()
    navigate("/login")
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/logo.png" alt="Sachith Service Center Logo" className="logo-image" />
      </div>
      {/* <p className="name">SACHITH SERVICE CENTER {user?.isAdmin ? "- ADMIN DASHBOARD" : ""}</p> */}
      <p className="name">SACHITH SERVICE CENTER</p>
      <ul className="navbar-links">
        {/* Only show login button if not on /dashboard */}
        {!location.pathname.startsWith('/dashboard') ? (
          <a href="/login" className="login-button">Login</a>
        ): <a className="login-button" onClick={onLogout}>Logout</a>}
      </ul>
    </nav>
  );
};

export default Navbar;
