const OnePost = ({ postData }) => {
  return (
    <div key={postData.id}>
      <h2>{postData.title}</h2>
      <p>{postData.content}</p>
      <p>{postData.location}</p>
      <img src={postData.image} alt={postData.title} />
    </div>
  );
};

export default OnePost;
