import { Link } from 'react-router-dom';
import '../css/sidebar.css';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home" className="link-style">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/artistas" className="link-style">Artistas</Link>
        </li>
        <li className="nav-item">
          <Link to="/albums" className="link-style">Albums</Link>
        </li>
        <li className="nav-item">
          <Link to="/musicas" className="link-style">Musicas</Link>
        </li>
        <li className="nav-item">
          <Link to="/playlists" className="link-style">Playlist</Link>
        </li>
      </ul>
    </div>
  );
};
