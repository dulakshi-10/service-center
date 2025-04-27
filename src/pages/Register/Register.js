import React, { useState } from 'react';
import './Register.css';  // Importing CSS file
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("check", fullName, email, phoneNumber, password)

    // Check if any field is empty
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create the request payload
    const requestBody = {
      name: fullName,
      email,
      telephone: phoneNumber,
      password,
    };
    try {
      // Send the POST request to the backend
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Handle response from the backend
      if (response.ok) {
        const data = await response.json();
        navigate('/login');
        
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong'}`);
      }
    } catch (error) {
      alert('Error during registration. Please try again later.');
    }
  };

  return (
    <div className="outer-container">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              title="Password must be at least 6 characters long"
              placeholder="Enter your password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
              title="Password must be at least 6 characters long"
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

