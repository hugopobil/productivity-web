import { useState, useEffect, useContext } from "react";
import { allChats } from "../services/ChatService";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";
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
    <div className="Chat-list-container">
      <div className="Title">
      <h2>Chats:</h2>
      </div>
      <div className="Chat-list">
        {chats.map((chat) => (
          <div key={chat.id}>
            <Link to={`/chats/${chat.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="Chat-info">
            <img src={chat.users[0].image} alt={chat.users[0].username} />
              <h3>{chat.users[0].username}</h3>
            </div>
            </Link>
          </div>
        ))}
        </div>
    </div>
  );
};

export default ChatList;