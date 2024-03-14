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
