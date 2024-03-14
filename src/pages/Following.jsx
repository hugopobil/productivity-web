import { useEffect, useState } from "react";
import { getUserFollowing } from "../services/FollowService";
import { useParams } from "react-router-dom";
import "./Following.css";
import { Link } from "react-router-dom";

const Following = () => {
  const params = useParams();
  const userId = params.id;

  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getUserFollowing(userId)
      .then((response) => {
        setFollowing(response);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="following-container">
      <h1>Followers:</h1>
      <ul>
        {following.map((following) => (
          <div className="follower">
            <img
              className="follower-img"
              src={following.image}
              alt={following.username}
            />
            <Link
              className="link-profile-user"
              to={`/profile/${following.id}`}
            >
              {following.username}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Following;
