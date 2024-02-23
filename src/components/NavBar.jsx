import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/register" className="navbar__link">Register</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar__link">Login</Link>
        </li>
        <li className="navbar-item">
          <Link to="/posts" className="navbar__link">Posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
