import React, { useState, useEffect, useContext } from "react";
import { getPosts, likePost } from "../services/PostService";
import AuthContext from "../contexts/AuthContext";
import "./posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(user);

  const handleLike = (postId) => {
    likePost(postId).then((response) => {
      fetchPosts();
    });
  };

  const fetchPosts = () => {
    getPosts()
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="posts-main-page">
      {user &&
        posts.map((post_returned) => {
          const isLiked = post_returned.likes.some((like) => {
            return like.user.id === user.id;
          });

          // cambiar por corazon en rojo o sin relleno
          const buttonStyle = {
            backgroundColor: isLiked ? "#1400FF" : "white",
            color: isLiked ? "white" : "black",
          };

          return (
            <div key={post_returned.id} className="post-container">
              <div className="posts-user-info">
              <img src={post_returned.user.image} alt="..." />
              <p className="by-user">{post_returned.user.username}</p>  
              </div>
              
              <p className="posts-location">
                <strong>{post_returned.location}</strong>
              </p>
              <img src={post_returned.image} alt={post_returned.title} />
              <h2 className="posts-title">{post_returned.title}</h2>
              <p className="posts-content">{post_returned.content}</p>
              <p className="posts-likes-head"><strong>Likes:</strong></p>
              {post_returned.likes.map((like) => {
                return (
                  <ul className="posts-likes-list">
                    <li key={like.user.id}>{like.user.username}</li>
                  </ul>
                );
              })}
              <br />
              <button
                className="like-button"
                onClick={() => handleLike(post_returned.id)}
                style={buttonStyle}
              >
                Like
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
