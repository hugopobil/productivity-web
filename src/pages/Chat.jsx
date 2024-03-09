import { useState, useEffect, useContext, useCallback } from 'react';
import { getMessagebyId, createMessage, getChat } from '../services/ChatService.js';
import { useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.jsx';
import "./Chat.css"


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
        <div className="Chat-container">
            <h2>Chat with {chat?.users[0].username}</h2>
            {/* <h3>{chat ? `Chat ID: ${chat._id}` : 'Loading...'}</h3> */}
            <div className="Chat-messages">
                {chat?.messages.map(message => {
                    const isMe = isUserLogged(message.user)

                    return (
                        <div className={`Message-content Message-content-${isMe  ? 'right' : 'left' }`} key={message._id}>
                            <div className={`Message Message-${isMe  ? 'right' : 'left' }`}>
                                {message.content}
                            </div>
                        </div>
                )})}
            </div>
            <div className="Input">
                <input className="Text-input"
                    type="text"
                    value={newMessageContent}
                    onChange={e => setNewMessageContent(e.target.value)}
                />
                <button onClick={handleSendMessage} className="Button-send">Send</button>
            </div>
        </div>
    );
};

export default Chat;
