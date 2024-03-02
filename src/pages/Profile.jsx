import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../services/PostService";
import { Link } from "react-router-dom";
import "./Profile.css";
import PostsByUser from "../components/PostsByUser";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);

  const numPosts = userPosts.length;

  useEffect(() => {
    getUserPosts(user.id).then((response) => {
      setUserPosts(response);
    });
  }, []);

  return (
    <div className="profile-main-page">
      <div className="profile-user-main-info">
        <img src={user.image} alt="userImage" />
        <h2>{user.username}</h2>
      </div>
      <div className="posts-info">
      <p>Number of posts: {numPosts}</p>
      </div>

      {userPosts.map((post) => {
        return <PostsByUser postData={post} />;
      })}
     
      {/* <ul>
          {user.likes.map((like) => {
            return <OnePost postData={like.post} />;
          })}
        </ul> */}
    </div>
  );
};

export default Profile;
