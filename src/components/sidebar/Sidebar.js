import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { useUser } from '../../context/UserContext'; // Import UserContext

const Sidebar = () => {
  const { user } = useUser();
  return (
    <div className='sidebar'>
      <h3>Menu</h3>
      <ul>
        {
          !user?.isAdmin ? (
            <>
            <li><Link to="order"> Service</Link></li>
            <li><Link to="manage-vehicle">Manage Vehicle</Link></li>
            <li><Link to="prices">Prices</Link></li>
            </>
          ) : (
            <>
            <li><Link to="manage-appointment"> Manage Appointment</Link></li>
            <li><Link to="manage-invoice">Invoice Management</Link></li>
            <li><Link to="reporting">Reporting</Link></li>
            </>
          )
        }
      </ul>
    </div>
  );
};

export default Sidebar;
