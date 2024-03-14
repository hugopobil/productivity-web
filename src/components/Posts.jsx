import React, { useState, useEffect, useContext } from "react";
import { getPosts, likePost } from "../services/PostService";
import AuthContext from "../contexts/AuthContext";
import "./posts.css";
import {
  createComment,
  follow,
  deleteComment as deleteCommentService,
} from "../services/PostService";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { user } = useContext(AuthContext);

  console.log(user);

  const handleLike = (postId) => {
    likePost(postId).then((response) => {
      fetchPosts();
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  const fetchPosts = () => {
    getPosts()
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => console.error(error));
  };

  // const handleCommentButton = () => {
  //   console.log("comment button clicked");
  //   console.log(comment);
  //   setComment(!comment);
  //   fetchPosts();
  // };

  const handleCommentSubmit = (postId, content) => {
    createComment(postId, { content: content, user: user.id }).then(
      (response) => {
        fetchPosts();
        setCommentText(""); // Clear the input content
      }
    );
  };

  const deleteComment = (commentId) => {
    deleteCommentService(commentId).then((response) => {
      fetchPosts();
    });
  };

  const handleShare = () => {
    const route = "localhost:5173" + window.location.pathname;
    navigator.clipboard.writeText(route);
    alert("Path has been copied to the clipboard");
  };

  const handleFollow = (userId, followerId) => {
    follow(userId, followerId).then((response) => {
      console.log(response);
      fetchPosts();
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="posts-main-page">
        {user &&
          posts.map((post_returned) => {
            const isLiked = post_returned.likes.some((like) => {
              return like.user?.id === user.id;
            });

            // cambiar por corazon en rojo o sin relleno
            const buttonStyle = {
              backgroundColor: isLiked ? "#1400FF" : "white",
              color: isLiked ? "white" : "black",
            };

            return (
              <div key={post_returned.id} className="post-container">
                <div className="posts-user-info">
                  <div className="posted-by-user-image">
                    <img src={post_returned.user.image} alt="" />
                    <div className="by-user">
                      <Link
                        className="link-profile-user"
                        to={`/profile/${post_returned.user.id}`}
                      >
                        {post_returned.user.username}
                      </Link>

                      <button
                        className="follow-button"
                        onClick={() => handleFollow(user.id, post_returned.id)}
                      >
                        + Follow
                      </button>
                    </div>
                  </div>
                </div>
                <p className="posts-location">
                  <>
                    {post_returned.location} ·{" "}
                    {formatTime(post_returned.duration)} ·{" "}
                    {new Date(post_returned.createdAt).toLocaleDateString()}
                  </>
                </p>
                <img src={post_returned.image} alt={post_returned.title} />

                <div className="posts-actions">
                  <button
                    className="share-button"
                    onClick={() => handleLike(post_returned.id)}
                    style={buttonStyle}
                  >
                    Support
                  </button>

                  <button className="share-button" onClick={handleShare}>
                    Share
                  </button>
                </div>

                <div className="post-likes">
                  {post_returned.likes ? post_returned.likes.length : 0} people
                  support this post
                </div>
                {/* <h2 className="posts-title">{post_returned.title}</h2> */}
                <p className="posts-content">{post_returned.content}</p>

                {/* <p className="posts-likes-head">
                <strong>Likes:</strong>
              </p>
              {post_returned.likes.map((like) => {
                return (
                  <ul className="posts-likes-list">
                    <li key={like.user?.id}>{like.user?.username}</li>
                  </ul>
                );
              })} */}
                {post_returned.comments && (
                  <div className="posts-commments-display">
                    {/* {post_returned.comments} */}
                    {post_returned.comments.map((comment) => {
                      return (
                        <div className="comments" key={comment.id}>
                          <p>
                            <strong>{comment.user.username}</strong>{" "}
                            {comment.content}
                          </p>

                          {user && comment.user.id === user.id && (
                            <button
                              className="delete-button"
                              onClick={() => deleteComment(comment.id)}
                            >
                              Detele
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="comment-section">
                  <input
                    className="comment-input"
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="comment-button"
                    onClick={() =>
                      handleCommentSubmit(post_returned.id, commentText)
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Posts;
