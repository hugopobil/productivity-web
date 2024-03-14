import { useEffect, useState } from 'react';
import { getUserFollowing } from '../services/FollowService';
import { useParams } from 'react-router-dom';
import "./Following.css"

const Following = () => {

    const params = useParams();
    const userId = params.id

    const [following, setFollowing] = useState([])

    useEffect(() => {
        getUserFollowing(userId) 
        .then((response) => {
            setFollowing(response);
          })
          .catch((error) => console.error(error));
    },[])

    return (
        <div className="following-container">
            <h1>Followers:</h1>
            <ul>
                {following.map((following) => (
                    <li key={following.id}>{following.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Following;