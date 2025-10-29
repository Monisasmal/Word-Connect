import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/play">Play Game</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>

      <div className="navbar-right">
        {currentUser && <span>Logged in as: <strong>{currentUser}</strong></span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
