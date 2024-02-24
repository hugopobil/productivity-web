import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import OnePost from "../components/OnePost";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>
        <p>User: {user.username}</p>
        <p>Email: {user.email}</p>
        
        <h2>Liked Posts</h2>
        <ul>
          {user.likes.map((like) => {
            return <OnePost postData={like.post} />;
          })}
        </ul>
    </div>
  );
};

export default Profile;
