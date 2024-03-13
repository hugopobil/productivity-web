import { useEffect, useState } from 'react';
import { getUserFollowing } from '../services/FollowService';
import "./Following.css"

const Following = () => {
    const [following, setFollowing] = useState([])

    useEffect(() => {
        getUserFollowing()
        .then((response) => {
            setFollowing(response);
          })
          .catch((error) => console.error(error));
    },[])

    return (
        <div>
            
        </div>
    );
};

export default Following;