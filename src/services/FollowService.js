import { createHttp } from "./BaseService"; 

const http = createHttp(true); 

export const toggleFollow = (followedId) => {
    return http.post(`/follows/${followedId}`)
}

export const getCurrentUserFollowing = () => {
    return http.get(`following/me`)
}

export const getUserFollowing = (id) => {
    return http.get(`following/${id}`)
} 

export const getcurrentUserFollowed = () => {
    return http.get(`followed/me`)
}

export const getUserFollowed = (id) => {
    return http.get(`followed/${id}`)
}
