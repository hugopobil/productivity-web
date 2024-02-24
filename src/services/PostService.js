import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getPosts = () => {
    return http.get('/posts')
}

export const likePost = (postId) => {
    return http.post(`/posts/like/${postId}`)
}

export const createPost = (data) => {
    return http.post('/posts/createNewPost', data)
}

