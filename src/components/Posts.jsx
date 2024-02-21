import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/posts')
//       .then(response => response.json())
//       .then(data => setPosts(data))
//       .catch(error => console.error(error));
//   }, []);

    useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
    }, []);

  return (
    <div>
      <h1>Posts</h1>
      {console.log(posts)}
        {posts.map(post => (
            <div key={post.id}>
            <h2>{post.title} by user: {post.user}</h2>
            <p>{post.content}</p>
            <p>{post.location}</p>
            <img src={post.image} alt={post.title} />

            
            </div>
        ))}
    </div>
  );
};

export default Posts;
