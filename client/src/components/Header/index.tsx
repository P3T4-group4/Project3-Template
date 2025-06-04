// client/src/components/Header.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth';
import '../../styles//Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const loggedIn = AuthService.loggedIn();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo and App Name */}
        <Link to="/" className="logo">
          {/* Replace "/logo.png" with the path to your actual logo file */}
          <img src="/logo.png" alt="StickDrift Logo" className="logo-image" />
          <h1 className="glitch-text" data-text="StickDrift">
            StickDrift
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          {loggedIn ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/search">Search</Link>
              <Link to={`/profile/${AuthService.getProfile().data._id}`}>
                My Profile
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
