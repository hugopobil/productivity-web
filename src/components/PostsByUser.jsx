import "./PostByUser.css";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
// import {getPosts, deletePost} from "../services/PostService";

const PostsByUser = ({ postData, deletePostSubmit }) => {

  const { user } = useContext(AuthContext);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  

    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  

  return (
    <div className="post-by-user-container" key={postData.id}>
      <div className="post-by-user-head">
      <h3 className="post-by-user-title">{postData.title}</h3>
      {user && postData.user === user.id && (
          <button
            className="post-by-user-head delet-button-posts"
            onClick={() => deletePostSubmit(postData.id)}
          >
            Delete Post
          </button>
        )}
      </div>
      
      <p className="posts-location">
        <>
          {postData.location} · {formatTime(postData.duration)} ·{" "}
          {new Date(postData.createdAt).toLocaleDateString()}
        </>
      </p>
      <img className="post-by-user-image" src={postData.image} alt="" />
      <p className="">{postData.content}</p>
    </div>
  );
};

export default PostsByUser;
