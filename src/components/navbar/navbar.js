import React from 'react';
import { useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const location = useLocation(); // 👈 get current route

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/logo.png" alt="Sachith Service Center Logo" className="logo-image" />
      </div>
      <p className="name">SACHITH SERVICE CENTER</p>
      <ul className="navbar-links">
        {/* Only show login button if not on /dashboard */}
        {!location.pathname.startsWith('/dashboard') && (
          <li><a href="/login" className="login-button">Login</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
