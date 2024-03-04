import "./PostByUser.css";

const PostsByUser = ({ postData }) => {

  return (
    <div className="post-by-user-container" key={postData.id}>
      <h3 className="post-by-user-title">{postData.title}</h3>
      <p className="post-by-user-content">{postData.location}</p>
      <p className="post-by-user-content">{postData.content}</p>
      <img className="post-by-user-image" src={postData.image} alt="" />
    </div>
  );
};

export default PostsByUser;
