import { createHttp } from "./BaseService";

const http = createHttp();

export const register = (data) => {
    return http.post('/users/create', data)
}

export const login = (data) => {
    return http.post('/login', data)
}

export const logout = () => {
    return http.post('/logout')
}