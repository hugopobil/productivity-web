import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from '../contexts/AuthContext';
import { update_post_likes } from '../services/PostService';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const handleLike = () => {
    update_post_likes({ likes: posts.likes + 1 }); 
  };

  //   useEffect(() => {
  //     fetch('http://localhost:3000/posts')
  //       .then(response => response.json())
  //       .then(data => setPosts(data))
  //       .catch(error => console.error(error));
  //   }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {console.log(posts)}
      {posts.map((post_returned) => (
        <div key={post_returned.id}>
          {/* <h2>{post_returned.title} by user: {post_returned.user}</h2> */}
          <p>{post_returned.id}</p>
          <p>{post_returned.content}</p>
          <p>{post_returned.location}</p>
          <img
            src={post_returned.image}
            // src={post_returned.image}
            alt={post_returned.title}
          />
          <button onClick={handleLike}>{post_returned.likes.length}</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
