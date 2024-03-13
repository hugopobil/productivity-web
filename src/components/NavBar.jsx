import { Link } from "react-router-dom";
import "./navbar.css";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import Button from "../components/Button";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* <li className="navbar-item">
          <Link to="/" className="navbar__link">
            Home
          </Link>
        </li> */}
        {/* {!user && (
          <li className="navbar-item">
            <Link to="/register" className="navbar__link">
              Register
            </Link>
          </li>
        )} */}
        {/* {!user && (
          <li className="navbar-item">
            <Link to="/login" className="navbar__link">
              Login
            </Link>
          </li>
        )} */}
        {/* <li className="navbar-item">
          <Link to="/posts" className="navbar__link">
            Posts
          </Link>
        </li> */}
        {user && <li className="navbar-item">
          <Link to="/posts" className="navbar__link">
          <span className="icon-home"></span>
          </Link>
        </li>}

        {user && <li className="navbar-item">
          <Link to="/posts/create" className="navbar__link">
          <span className="icon-plus"></span>
          </Link>
        </li>}

        {user && (
          <li className="navbar-item">
            <Link to="/chats/me" className="navbar__link">
            <span className="icon-bubbles2"></span>
            </Link>
          </li>
        )}

        {user && (
          <li className="navbar-item">
            <Link to="/chrono" className="navbar__link">
              <span className="icon-equalizer"></span>
            </Link>
          </li>
        )}

      
      </ul>

      {/* {user && <Link to='/profile'>{user.username}</Link>} */}
    </nav>
  );
};

export default Navbar;
