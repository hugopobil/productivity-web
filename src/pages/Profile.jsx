import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../services/PostService";
import "./profile.css";
import PostsByUser from "../components/PostsByUser";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { getUserByID } from "../services/UserService";

const Profile = (props) => {
  const userId = useParams();
  const { user, logout } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const numPosts = userPosts.length;

  useEffect(() => {
    if (userId) {
      getUserPosts(userId.id).then((response) => {
        response.sort((a, b) => b.createdAt - a.createdAt);
        setUserPosts(response);
      });
      getUserByID(userId.id).then((response) => {
        setUserProfile(response);
        console.log(response);
      });
    }

    if (!userId) {
      getUserPosts(user.id).then((response) => {
        response.sort((a, b) => b.createdAt - a.createdAt);
        setUserPosts(response);
      });
    }

  }, []);
  return (
    <div className="profile-main-page">
      <div className="profile-user-main-info">
        <img src={userId ? userProfile.image : user.image} alt="userImage" />
        <div>
          <h2>{userId ? userProfile.username : user.username}</h2>
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
