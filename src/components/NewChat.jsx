import { createChat } from '../services/ChatService';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getChatByUsers } from '../services/ChatService';

const NewChat = () => {
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getChatByUsers(userId)
            .then((fetchedChat) => {
                if (fetchedChat) {
                    navigate(`/chats/${fetchedChat.id}`);
                } else {
                    createChat(userId)
                        .then((chat) => {
                            navigate(`/chats/${chat.id}`);
                        })
                        .catch(err => {
                            console.error('Error during creation', err);
                        });
                }
            })
            .catch(err => {
                console.error('Error during chat fetch', err);
            });
    }, [ userId, navigate])
    return (
        <div>
           <h1>creating Chat</h1> 
        </div>
    );
};

export default NewChat;