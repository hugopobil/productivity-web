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
        <li className="navbar-item">
          <Link to="/posts/create" className="navbar__link">
            Create Post
          </Link>
        </li>

        {user && (
          <li className="navbar-item">
            <Link to="/messages" className="navbar__link">
              Messages
            </Link>
          </li>
        )}

        {user && (
          <li className="navbar-item">
            <Link to="/pomodoro" className="navbar__link">
              Pomodoro
            </Link>
          </li>
        )}

        {user && (
          <li className="navbar-item">
            <Button className="logout-button" onClick={logout}>Logout</Button>
          </li>
        )}
      </ul>

      {/* {user && <Link to='/profile'>{user.username}</Link>} */}
    </nav>
  );
};

export default Navbar;
