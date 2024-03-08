import { useState, useEffect, useContext } from "react";
import { allChats } from "../services/ChatService";
import AuthContext from "../contexts/AuthContext";
import "./ChatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = () => {
    allChats()
      .then((response) => {
        setChats(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="chat-list">
      <h2>Lista de Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <div className="chat-info">
              <img src={chat.user.image} alt={chat.user.name} />
              <div className="user-info">
                <h3>{chat.user.name}</h3>
                {/* Puedes añadir más información del chat si lo necesitas */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;