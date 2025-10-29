import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

export default function Signup({ onAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[username]) {
      alert("User already exists!");
      return;
    }
    
    users[username] = { password, scores: [] };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);  // Auto login after signup
    
    onAuth(); // Notify App.jsx that user is now logged in
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h2>Signup</h2>
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
      <button onClick={handleSignup}>Register</button>
    </div>
  );
}
