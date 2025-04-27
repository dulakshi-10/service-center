import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h3>Menu</h3>
      <ul>
        <li><Link to="order">Order a Service</Link></li>
        <li><Link to="manage-vehicle">Manage Vehicle</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
