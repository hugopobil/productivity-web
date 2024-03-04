import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../services/PostService";
import { Link } from "react-router-dom";
import "./profile.css";
import PostsByUser from "../components/PostsByUser";
import Button from "../components/Button";

const Profile = (user_link) => {
  const { user, logout } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);

  const numPosts = userPosts.length;

  useEffect(() => {
    getUserPosts(user_link.id ? user_link.id : user.id)
      .then((response) => {
        
        // Order response by field CreatedAt
        response.sort((a, b) => b.createdAt - a.createdAt);
        setUserPosts(response);
      });
  }, []);
  return (
    <div className="profile-main-page">
      <div className="profile-user-main-info">
        <img src={user.image} alt="userImage" />
        <div>
          <h2>{user.username}</h2>
          {user && (
            <li className="navbar-item">
              <Button className="logout-button" onClick={logout}>
                Logout
              </Button>
            </li>
          )}
        </div>
      </div>
      <div className="posts-info">
        <p>Number of posts: {numPosts}</p>
      </div>

      {!userPosts.length && (
        <p>
          <strong>...</strong>
        </p>
      )}
      {!userPosts.length && (
        <p>
          <strong>No posts yet</strong>
        </p>
      )}

      {userPosts.map((post) => {
        return <PostsByUser key={post.id} postData={post} />;
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
