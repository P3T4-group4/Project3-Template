// client/src/pages/Library.tsx

import React from 'react';
import '../styles/Library.css';

const Library: React.FC = () => {
  return (
    <main className="page-wrapper">
      <div className="library-container">
        <h1 className="library-title">Library</h1>
        <div className="library-description">
          <p>Your game collection will appear here!</p>
          <p>Stay tuned for features coming soon.</p>
        </div>
      </div>
    </main>
  );
};

export default Library;
