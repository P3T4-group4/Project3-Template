// client/src/pages/GameCollections.tsx

import React from 'react';
import '../styles/GameCollections.css';

interface Game {
  id: string;
  title: string;
  platform: string;
}

const GameCollections: React.FC = () => {
  // Placeholder data – replace with real fetched collection later
  const myGames: Game[] = [
    { id: '1', title: 'Neon Runner', platform: 'PC' },
    { id: '2', title: 'Cyber Racer', platform: 'Switch' },
    { id: '3', title: 'Starlight Odyssey', platform: 'Xbox' },
  ];

  return (
    <main className="page-wrapper">
      <div className="gamecollections-container">
        <h1 className="gamecollections-title">Game Collections</h1>
        <div className="gamecollections-description">
          Here are all the games in your library:
        </div>

        <ul className="gamecollections-list">
          {myGames.map((game) => (
            <li key={game.id} className="gamecollections-item">
              <span className="game-title">{game.title}</span>
              <span className="game-platform">{game.platform}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default GameCollections;
