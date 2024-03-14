import { useState, useEffect, useContext } from "react";
import { allChats } from "../services/ChatService";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./ChatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const { user: currentUser } = useContext(AuthContext)

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
            {chat.users.map(user => (
              user.id !== currentUser.id && (
                <div className="Chat-info">
                <img className="chat-profile-image" src={user.image} alt={user.username} />
                <h3>{user.username}</h3>
                </div>
              )
            ))}
            </Link>
          </div>
        ))}
        </div>
    </div>
  );
};

export default ChatList;