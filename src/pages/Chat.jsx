import { useState, useEffect, useContext, useCallback } from 'react';
import { getMessagebyId, createMessage, getChat } from '../services/ChatService.js';
import { useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.jsx';


const Chat = () => {

    const { user } = useContext(AuthContext)
    console.log(user.id)

    const isUserLogged = (userId) => { 
        return userId === user.id
    }

    const { chatId } = useParams()
    const [chat, setChat] = useState(null);
    const [newMessageContent, setNewMessageContent] = useState('');

    const fetchChat = useCallback(() => {
        getChat(chatId)
            .then(chatRes => {
                // console.log(chatRes)
                setChat(chatRes);
            })
            .catch(error => {
                console.error('Error fetching chat or messages:', error);
    })}, []);

    useEffect(() => {
        fetchChat()
    }, [fetchChat]);

    const handleSendMessage = () => {
        createMessage(chatId, newMessageContent)
            .then(() => {
                setNewMessageContent('');
                fetchChat()
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <div>
            <h2>Chat with </h2>
            <h3>{chat ? `Chat ID: ${chat._id}` : 'Loading...'}</h3>
            <ul>
                {chat?.messages.map(message => {
                    const isMe = isUserLogged(message.user)
                    console.log(isMe)
                    return (
                    <li key={message._id} className={`${isMe  ? 'right' : 'left' }`}>{message.content}</li>
                )})}
            </ul>
            <div>
                <input
                    type="text"
                    value={newMessageContent}
                    onChange={e => setNewMessageContent(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
