import { Link } from "react-router-dom";
import "../css/sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav-list flex space-x-6">
        <li className="nav-item">
          <Link to="/home" className="link-style">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/artist" className="link-style">
            Artistas
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/albums" className="link-style">
            Albums
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/musicas" className="link-style">
            Músicas
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/playlists" className="link-style">
            Playlist
          </Link>
        </li>
      </ul>
    </div>
  );
};
