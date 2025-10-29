import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 
export default function Login({ onAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[username]) {
      alert('User does not exist. Please signup first.');
      return;
    }
    if (users[username].password !== password) {
      alert('Incorrect password');
      return;
    }
    localStorage.setItem('currentUser', username);
    onAuth();
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <p>Don't have an account?</p>
      <button onClick={() => navigate('/signup')}>Signup Here</button>
    </div>
  );
}
