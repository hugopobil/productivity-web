import { useEffect, useState } from 'react';
import { getUserFollowed } from '../services/FollowService';
import "./Followers.css"
import { useParams } from 'react-router-dom';

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
        <div className="followers-container">
            <h1>Followers:</h1>
            <ul>
                {followers.map((follower) => (
                    <li key={follower.id}>{follower.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Followers;