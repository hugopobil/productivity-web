import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getPosts = () => {
  return http.get("/posts");
};

export const getUserPosts = (userId) => {
  return http.get(`/posts/user/${userId}`);
};

export const likePost = (postId) => {
  return http.post(`/posts/like/${postId}`);
};

export const createPost = (data) => {
  return http.post("/posts/createNewPost", data);
};

export const createComment = (postId, data) => {
  return http.post(`/posts/${postId}/comment`, data);
};

export const deleteComment = (commentId) => {
  return http.delete(`/posts/${commentId}`);
};

export const getUserProfile = (userId) => {
  return http.get(`/profile/${userId}`);
};

export const follow = (userId, followerId) => {
  return http.post(`/follow/${userId}/${followerId}`);
};

export const deletePost = (postId) => {
  return http.delete(`/posts/delete/${postId}`);
};

export const updatePost = (id, postData) => {
  return http.put(`/posts/update/${id}`, postData);
}; 

export const getPost = (postId) => {
  return http.get(`/post/${postId}`)
}

