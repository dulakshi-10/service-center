import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h3>Menu</h3>
      <ul>
        <li><Link to="order"> Service</Link></li>
        <li><Link to="manage-vehicle">Manage Vehicle</Link></li>
        <li><Link to="prices">Prices</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;
