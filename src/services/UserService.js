import { createHttp } from './BaseService';

const http = createHttp(true)

export const getUser = () => {
    return http.get(`/users`)
}

export const getCurrentUser = () => {
    return http.get('/users/me')
}