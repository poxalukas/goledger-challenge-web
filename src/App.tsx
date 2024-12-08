// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import { HomePage } from './HomePage';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/home" element={<HomePage />} />  
      </Routes>
    </div>
  );
};
