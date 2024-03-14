import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../services/PostService";
import "./profile.css";
import PostsByUser from "../components/PostsByUser";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { getUserByID } from "../services/UserService";
import {
  toggleFollow,
  getUserFollowed,
  getUserFollowing,
} from "../services/FollowService";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const userId = useParams();
  const { user, logout } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const numPosts = userPosts.length;
  const userIsSame = user.id === userId.id;

  const profileUserId = userId.id || user.id;

  useEffect(() => {
    if (userId) {
      getUserPosts(userId.id).then((response) => {
        response.sort((a, b) => b.createdAt - a.createdAt);
        addDurationAndSetTotalCount(response);
      });
      getUserByID(userId.id).then((response) => {
        setUserProfile(response);
      });

      // checkIfFollowing();
      checkIfFollowing(userId.id);
      getFollowers(userId.id);
      getFollowing(userId.id);
    }

    if (!userId) {
      getUserPosts(user.id).then((response) => {
        response.sort((a, b) => b.createdAt - a.createdAt);
        addDurationAndSetTotalCount(response);
      });
    }

    const addDurationAndSetTotalCount = (response) => {
      let count = 0;
      response.forEach((post) => {
        count += post.duration;
      });
      setTotalCount(count);
      setUserPosts(response);
    };
  }, [userId, user.id]);

  const checkIfFollowing = () => {
    getUserFollowed(userId.id)
      .then((followedUsers) => {
        setIsFollowing(
          followedUsers.some((followedUser) => followedUser.id === user.id)
        );
      })
      .catch((error) => {
        console.error("Error checking if following:", error);
      });
  };

  const getFollowers = () => {
    getUserFollowed(userId.id)
      .then((followers) => {
        setFollowersCount(followers.length);
      })
      .catch((error) => {
        console.error("Error getting followers:", error);
      });
  };

  const getFollowing = (userId) => {
    getUserFollowing(userId)
      .then((following) => {
        setFollowingCount(following.length);
      })
      .catch((error) => {
        console.error("Error getting following:", error);
      });
  };

  const editProfile = () => {};

  useEffect(() => {
    if (userId) {
      getUserPosts(userId.id).then((response) => {
        response.sort((a, b) => b.createdAt - a.createdAt);
        setUserPosts(response);
      });
      getUserByID(userId.id).then((response) => {
        setUserProfile(response);
      });
    }

    if (!userId) {
      getUserPosts(user.id).then((response) => {
        response.sort((a, b) => b.createdAt - a.createdAt);
        setUserPosts(response);
      });
    }
  }, [userId, user.id]);

  const handleToggleFollow = async () => {
    try {
      await toggleFollow(userId.id);
      setIsFollowing(!isFollowing);
      getFollowers();
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <div className="profile-main-page">
      <div className="profile-user-main-info">
        <img src={userId ? userProfile.image : user.image} alt="userImage" />
        <div className="profile-head">
          <h2>{userId ? userProfile.username : user.username}</h2>
          <div className="userProfileButtons">
            {userIsSame && (
              <>
                <li className="navbar-item">
                  <Button className="profile-button" onClick={logout}>
                    Logout
                  </Button>
                </li>
                <li className="navbar-item">
                  <Link to={`/edit/profile/${user.id}`}>
                    <p>Edit Profile</p>
                  </Link>
                </li>
              </>
            )}
            {!userIsSame && (
              <li className="navbar-item">
                <Button
                  className="profile-button"
                  linkTo={`/chats/create/${userId.id}`}
                >
                  Message
                </Button>
              </li>
            )}
            {!userIsSame && (
              <Button className="follow-button" onClick={handleToggleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>

          <div className="followers-following-counts">
            <Link to={`/followers/${profileUserId}`}>
              <p>Followers: {followersCount}</p>
            </Link>
            <Link to={`/following/${profileUserId}`}>
              <p>Following: {followingCount}</p>
            </Link>
          </div>
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
