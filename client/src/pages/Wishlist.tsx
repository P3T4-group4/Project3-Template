// client/src/pages/Wishlist.tsx

import React from 'react';
import '../styles/Wishlist.css';

interface Game {
  id: string;
  title: string;
  platform: string;
}

const Wishlist: React.FC = () => {
  // Placeholder data; replace with fetched wishlist items as needed
  const wishlistItems: Game[] = [
    { id: '1', title: 'Star Drift', platform: 'PC' },
    { id: '2', title: 'Neon Horizon', platform: 'Switch' },
    { id: '3', title: 'Cyber Frontier', platform: 'Xbox' },
  ];

  return (
    <main className="page-wrapper">
      <div className="wishlist-container">
        <h1 className="wishlist-title">My Wishlist</h1>
        <div className="wishlist-description">
          These are the games I’m looking forward to playing:
        </div>

        <ul className="wishlist-items">
          {wishlistItems.map((game) => (
            <li key={game.id} className="wishlist-item">
              <span className="game-title">{game.title}</span>
              <span className="game-platform">{game.platform}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Wishlist;
