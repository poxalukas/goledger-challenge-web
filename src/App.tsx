// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import { HomePage } from './HomePage';
import { ArtistHome } from './pages/artista/ArtistPage';
import { AlbumHome } from './pages/album/AlbumPage';
import { SomHome } from './pages/som/SomPage';
import { PlayListHome } from './pages/playlist/PlaylistPage';
import { SomInclude } from './pages/som/Sominclude';
import { ArtistInclude } from './pages/artista/ArtistInclude';
import { AlbumInclude } from './pages/album/AlbumInclude';
import { PlaylistInclude } from './pages/playlist/PlaylistInclude';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/home" element={<HomePage />} />  
        <Route path="/artist" element={<ArtistHome />} />  
        <Route path="/artist/add" element={<ArtistInclude />} />  
        <Route path="/albums" element={<AlbumHome />} />  
        <Route path="/albums/add" element={<AlbumInclude />} />  
        <Route path="/musicas" element={<SomHome />} />  
        <Route path="/musicas/add" element={<SomInclude />} />  
        <Route path="/playlists" element={<PlayListHome />} />  
        <Route path="/playlists/add" element={<PlaylistInclude />} />  
        <Route path="/playlists/add/:id/:action" element={<PlaylistInclude />} />
      </Routes>
    </div>
  );
};
