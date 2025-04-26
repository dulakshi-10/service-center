import React, { useState } from 'react';
import './Login.css';  // CSS file eka import karanawa

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logged in with:', username, password);
    };

    const handleNewUser = (e) => {
        e.preventDefault();
        console.log('Creating new user with:', username, password);
    };
  
    return (
        <div className="login-container">
            <h2 className='login-text'>Login</h2>
            <form className="login-form">
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
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
                    />
                </div>
                <button type="submit" className="login-btn" onClick={handleLogin}>Login</button>
                <button type="button" className="new-user-btn" onClick={handleNewUser}>New User</button>
            </form>
        </div>
    );
}

export default Login;
