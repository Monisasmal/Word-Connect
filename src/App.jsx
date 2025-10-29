import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Dashboard from './Components/Dashboard';
import WordConnectGame from './Components/WordConnect';
import Leaderboard from './Components/LeaderBoard';
import Navbar from './Components/Navbar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('currentUser'));
  const [usersExist, setUsersExist] = useState(() => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    return Object.keys(users).length > 0;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('currentUser'));
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      setUsersExist(Object.keys(users).length > 0);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      {/* Show Navbar only when logged in */}
      {isLoggedIn && <Navbar onLogout={() => setIsLoggedIn(false)} />}
      
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/play" />
              : usersExist
              ? <Navigate to="/login" />
              : <Navigate to="/signup" />
          }
        />

        <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup onAuth={() => setIsLoggedIn(true)} />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onAuth={() => setIsLoggedIn(true)} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/play" element={isLoggedIn ? <WordConnectGame /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={isLoggedIn ? <Leaderboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
