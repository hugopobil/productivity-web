import { createHttp } from "./BaseService";

const http = createHttp();

export const update_post_likes = (data) => {
    return http.put('/posts/post:id', data)
}

