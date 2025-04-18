import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Sachith Service Center</div>
      <ul className="navbar-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/order">Order a Service</a></li>
        <li><a href="/manageVehical">Manage Vehicle</a></li>
        <li><a href="/">Login</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/aboutUs">About Us</a></li>
        <li><a href="/contactUs">ContactUs</a></li>
     
      </ul>
    </nav>
  );
};

export default Navbar;
