import "./PostByUser.css";

const PostsByUser = ({ postData }) => {

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="post-by-user-container" key={postData.id}>
      <h3 className="post-by-user-title">{postData.title}</h3>
      <p className="post-by-user-content">{postData.location}</p>
      <p className="post-by-user-content">{new Date(postData.createdAt).toLocaleDateString()}</p>
      <p className="post-by-user-content">Duration: {formatTime(postData.duration)}</p>
      <p className="">{postData.content}</p>
      <img className="post-by-user-image" src={postData.image} alt="" />
    </div>
  );
};

export default PostsByUser;
