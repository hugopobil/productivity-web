import { createHttp } from "./BaseService"; 

const http = createHttp(true);

export const getMessagebyId = (chatId) => {
    return http.get(`/chats/${chatId}/messages`)
}

export const createMessage = (chatId) => {
    return http.post(`/chats/${chatId}/messages/create`)
}

export const allChats = () => {
    return http.get("/chats/me")
}

export const getChat = (chatId) => {
    return http.get(`/chats/${chatId}`)
}

export const createChat = (userId) => {
    return http.post(`/chats/${userId}`)
}

export const deleteChat = (chatId) => {
    return http.delete(`/chats/${chatId}/delete`)
}