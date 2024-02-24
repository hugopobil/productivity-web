import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getPosts = () => {
    // console.log(http.get('/posts'));
    return http.get('/posts')
}

// export const update_post_likes = (data) => {
//     return http.put('/posts/post:id', data)
// }

