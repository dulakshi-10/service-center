import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import NavbarComponent from './components/navbar/navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import OrderService from './pages/OrderAService/orderAService'
import VehicleManagement from './pages/ManageVehical/manageVehical'
import Prices from './pages/Prices/Prices';

import './App.css';


function App() {
    return (
        <Router>
            <div style={{ height: '100%' }}>
                <NavbarComponent />
                <div className='main-container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />}>
                            {/* Nested routes */}
                            <Route path="" element={<OrderService />} />
                            <Route path="order" element={<OrderService />} />
                            <Route path="manage-vehicle" element={<VehicleManagement />} />
                            <Route path="prices" element={<Prices />} />
                            
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
