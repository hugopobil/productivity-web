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

export const activateUser = () => {
    return http.get('/activate/:token')
}