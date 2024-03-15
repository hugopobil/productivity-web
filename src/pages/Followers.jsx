import { useEffect, useState } from 'react';
import { getUserFollowed } from '../services/FollowService';
import "./Following.css"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Followers = () => { 

    const params = useParams();
    const userId = params.id

    const [followers, setFollowers] = useState([])

    useEffect(() => {
        console.log(userId)
        getUserFollowed(userId)
        .then((response) => {
            setFollowers(response);
          })
          .catch((error) => console.error(error));
    },[])

    return (
    <div className="following-container">
      <h1>Followers</h1>
      <ul>
        {followers.map((follower) => (
          <div className="follower">
            <img
              className="follower-img"
              src={follower.image}
              alt={follower.username}
            />
            <Link
              className="link-profile-user"
              to={`/profile/${follower.id}`}
            >
              {follower.username}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Followers;