import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../utils/session'; // Import the session utility
import { useUser } from '../../context/UserContext'; // Import UserContext

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser();

    const HandleLogin = async (e) => {
        e.preventDefault();
        const requestBody = {
            email: username,
            password,
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                saveToken(data.token);
                setUser({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    isAdmin: data.isAdmin
                }); 
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Something went wrong'}`);
            }
        } catch (error) {
            alert('Error during Login. Please try again later.');
        }
    };

    const HandleNewUser = () => {
        navigate('/register');
    };

    return (
        <div 
            className='outer-container' 
            style={{ 
                backgroundImage: "url('/images/1.jpg')", 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh'
            }}
        >
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
                    <button type="submit" className="login-btn" onClick={HandleLogin}>Login</button>
                    <button type="button" className="new-user-btn" onClick={HandleNewUser}>New User</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
