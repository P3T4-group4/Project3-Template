// client/src/pages/Playlist.tsx

import React from 'react';
import '../styles/Playlist.css';

interface Song {
  id: string;
  title: string;
  artist: string;
}

const Playlist: React.FC = () => {
  // Placeholder data—replace with actual fetched playlist items as needed
  const songs: Song[] = [
    { id: '1', title: 'Neon Nights', artist: 'SynthWave' },
    { id: '2', title: 'Starlight Drive', artist: 'Electronica' },
    { id: '3', title: 'Digital Dreams', artist: 'FuturePulse' },
  ];

  return (
    <main className="page-wrapper">
      <div className="playlist-container">
        <h1 className="playlist-title">My Playlist</h1>
        <ul className="playlist-items">
          {songs.map((song) => (
            <li key={song.id} className="playlist-item">
              <div className="song-info">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
              <button className="play-button">Play ▶</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Playlist;
