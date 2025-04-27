import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import "./Dashboard.css"
function Dashboard() {
    return (
        <div className="main-container">
            <Sidebar />
            <div className="dashboard-render">
                <Outlet /> {/* Renders nested routes */}
            </div>
        </div>
    );
}

export default Dashboard;
