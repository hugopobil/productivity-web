import { createHttp } from './BaseService';

const http = createHttp(true)

export const getUser = () => {
    return http.get(`/users`)
}

export const getUserByID = (userId) => {
    return http.get(`/users/${userId}`)
}

export const getCurrentUser = () => {
    return http.get('/users/me')
} 

export const activateUser = (token) => {
    return http.get(`/activate/${token}`)
}

export const editUser = (userId, userData) => {
    return http.put(`/editprofile/${userId}`, userData);
};
