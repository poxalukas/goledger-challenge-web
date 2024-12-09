// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import { HomePage } from './HomePage';
import { ArtistHome } from './pages/artista/ArtistPage';
import { AlbumHome } from './pages/album/AlbumPage';
import { SomHome } from './pages/som/SomPage';
import { PlayListHome } from './pages/playlist/PlaylistPage';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/home" element={<HomePage />} />  
        <Route path="/artist" element={<ArtistHome />} />  
        <Route path="/albums" element={<AlbumHome />} />  
        <Route path="/musicas" element={<SomHome />} />  
        <Route path="/playlists" element={<PlayListHome />} />  
      </Routes>
    </div>
  );
};
