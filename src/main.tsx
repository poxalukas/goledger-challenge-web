import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter
import './styles/tailwind.css';
import { App } from './App.tsx';
import { Sidebar } from './components/sidebar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div > 
        <div >
          <Sidebar />
        </div>
        <div> 
          <App />
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);