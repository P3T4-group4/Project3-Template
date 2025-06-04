// client/src/App.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * App.tsx is now purely the “layout frame”:
 *  - <Header /> always shows at the top,
 *  - <Outlet /> renders the active child route (Home, Profile, etc.),
 *  - <Footer /> always shows at the bottom.
 */
const App: React.FC = () => {
  return (
    <>
      <Header />

      {/* Outlet renders whichever page matches the URL */}
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default App;
