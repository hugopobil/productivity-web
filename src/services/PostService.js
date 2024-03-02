import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getPosts = () => {
    return http.get('/posts')
}

export const getUserPosts = (userId) => {
    return http.get(`/posts/user/${userId}`)
}

export const likePost = (postId) => {
    return http.post(`/posts/like/${postId}`)
}

export const createPost = (data) => {
    return http.post('/posts/createNewPost', data)
}

export const createComment = (postId, data) => {
    return http.post(`/posts/${postId}/comment`, data)
}

export const deleteComment = (commentId) => {
    return http.delete(`/posts/${commentId}`)
}

