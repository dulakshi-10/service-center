// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import OrderAService from './pages/OrderAService/orderAService';
import NavbarComponent from './components/navbar/navbar';
import ManageVehical from './pages/ManageVehical/manageVehical';
import './App.css';  // CSS improt
function App() {
  return (
    <Router>
      <div style={{height: '100%'}}>
        <NavbarComponent/>
        <div className='main-container'>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/order" element={<OrderAService />} />
            <Route path="/manageVehical" element={<ManageVehical/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 
