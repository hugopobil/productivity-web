import "./TitleBar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const TitleBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="TitleBar">
      {user && (
        <div className="TitleBar-item">
          <Link to={`/profile/${user.id}`} className="TitleBar__link">
            <img
              className="profile-titlebar-image"
              src={user.image}
              alt="userImage"
            />
          </Link>
        </div>
      )}
      <h1>
        <Link to="/" className="TitleBar__link">
          ACHIEVE IT
        </Link>
      </h1>
      <Link to={"/chats/me"} className="TitleBar__link">
        <span className="icon-bubbles2"></span>
      </Link>
    </div>
  );
};

export default TitleBar;
