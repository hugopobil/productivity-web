import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

    // Estado para mantener el recuento de likes
    const [likes, setLikes] = useState(0);
    // Estado para mantener si el post ha sido "liked" o no
    const [liked, setLiked] = useState(false);
  
    // Función para manejar el evento de "like"
    const handleLike = () => {
      if (!liked) {
        setLikes(likes + 1);
        setLiked(true);
      } else {
        setLikes(likes - 1);
        setLiked(false);
      }
    };

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
            <img 
            src={post.image} 
            // src={post.image} 
            alt={post.title} />
            <button onClick={handleLike}>
                {liked ? 'Unlike' : 'Like'} ({likes})
            </button>

            
            </div>
        ))}
    </div>
  );
};

export default Posts;
