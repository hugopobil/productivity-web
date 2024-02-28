import "./TitleBar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const TitleBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="TitleBar">
      <h1>ACHIEVE IT</h1>
      {user && (
        <div className="TitleBar-item">
          <Link to="/profile" className="TitleBar__link">
            {user.username}
          </Link>
        </div>
      )}
    </div>
  );
};

export default TitleBar;
