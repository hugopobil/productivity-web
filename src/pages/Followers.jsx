import { useEffect, useState } from 'react';
import { getUserFollowed } from '../services/FollowService';
import "./Followers.css"
import { useEffect } from 'react';

const Followers = ({ userId }) => {
    const [followers, setFollowers] = useState([])

    useEffect(() => {
        getUserFollowed(userId)
        .then((response) => {
            setFollowers(response);
          })
          .catch((error) => console.error(error));
    },[])

    return (
        <div>
            
        </div>
    );
};

export default Followers;