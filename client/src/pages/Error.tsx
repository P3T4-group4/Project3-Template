// client/src/pages/Error.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Error.css';

const ErrorPage: React.FC = () => {
  return (
    <main className="page-wrapper">
      <div className="error-container">
        <h2>Oops! Page Not Found (404)</h2>
        <Link to="/" className="link-button">Go back to Home</Link>
      </div>
    </main>
  );
};

export default ErrorPage;
