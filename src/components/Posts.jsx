import React, { useState, useEffect } from "react";
import { getPosts } from '../services/PostService';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const handleLike = () => {
    console.log("Like button clicked");
  };

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post_returned) => (
        <div key={post_returned.id}>
          <h2>{post_returned.title} by user: {post_returned.user}</h2>
          
          <p>{post_returned.content}</p>
          <p>{post_returned.location}</p>
          <img
            src={post_returned.image}
            // src={post_returned.image}
            alt={post_returned.title}
          />
          <br></br>
          <button onClick={handleLike}>Like</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
