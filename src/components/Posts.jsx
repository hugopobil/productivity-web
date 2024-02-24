import React, { useState, useEffect, useContext } from "react";
import { getPosts, likePost } from "../services/PostService";
import AuthContext from "../contexts/AuthContext";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

console.log(user)

  const handleLike = (postId) => {
    likePost(postId).then((response) => {
      fetchPosts()
    });
  };

  const fetchPosts = () => {
    getPosts()
    .then((response) => {
      setPosts(response);
    })
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {user && posts.map((post_returned) => {
        const isLiked = post_returned.likes.some((like) => {
          return like.user.id === user.id;
        });
        
        // cambiar por corazon en rojo o sin relleno
        const buttonStyle = {
          backgroundColor: isLiked ? "green" : "white",
        };

        return (
          <div key={post_returned.id}>
            <h2>
              {post_returned.title} by user:{post_returned.user.username}
            </h2>

            <p>{post_returned.content}</p>
            <p>{post_returned.location}</p>
            <img src={post_returned.image} alt={post_returned.title} />
            <br />

            <p>Personas que han dado like:</p>
            {post_returned.likes.map((like) => {
              return <ul><li key={like.user.id}>{like.user.username}</li></ul>;
            })}
            <br />
            <button
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
