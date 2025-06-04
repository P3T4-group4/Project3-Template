// client/src/components/Footer.tsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {location.pathname !== '/' && (
          <button className="footer-link" onClick={handleGoBack}>
            &larr; Go Back
          </button>
        )}
        <div className="footer-text">
          &copy; {new Date().getFullYear()} — Project Three Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;
