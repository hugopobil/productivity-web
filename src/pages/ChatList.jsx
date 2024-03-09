import { useState, useEffect, useContext } from "react";
import { allChats } from "../services/ChatService";
import AuthContext from "../contexts/AuthContext";
import "./ChatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    allChats()
      .then((response) => {
        setChats(response);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log("Chats:", chats);

  return (
    <div className="chat-list">
      <h2>Lista de Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <div className="chat-info">
            <img src={chat.users[0].image} alt={chat.users[0].username} />
          <div className="user-info">
            <h3>{chat.users[0].username}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;