import { useState, useEffect, useContext } from "react";
import { allChats } from "../services/ChatService";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./ChatList.css";
import { getAllUsers } from "../services/UserService";
import Button from "../components/Button";
import { deleteChat } from "../services/ChatService";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("descargo los chats");
    getAllUsers().then((response) => {
      setUsers(response);
    });
    allChats()
      .then((response) => {
        setChats(response);
      })
      .catch((error) => console.error(error));
  }, [searchTerm]);

  const deleteChatSubmit = (chatId) => {
    deleteChat(chatId)
      .then((response) => {
        setChats(chats.filter((chat) => chat.id !== chatId));
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="Chat-list-container">
      <div className="Title">
        <h1 style={{
          color: "#1400FF"
        }}>Chats</h1>
        <input
          className="search-bar"
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && !searchResults && (
          <p>No se encontraron resultados</p>
        )}

        {searchTerm && (
          <div>
            {users
              .filter((user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <div key={user.id} className="search-results">
                  <Link to={`/profile/${user.id}`}>
                    <h3>{user.username}</h3>
                  </Link>

                  <li className="navbar-item">
                    <Button
                      style={{ margin: "0px 10px" }}
                      className="message-button-search"
                      linkTo={`/chats/create/${user.id}`}
                    >
                      Message
                    </Button>
                  </li>
                </div>
              ))}
          </div>
        )}

        {searchTerm && searchResults.map((chat) => <div>{chat}</div>)}
      </div>
      <div className="Chat-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-row">
            <Link
              to={`/chats/${chat.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {chat.users.map(
                (user) =>
                  user.id !== currentUser.id && (
                    <div className="Chat-info">
                      <img
                        className="chat-profile-image"
                        src={user.image}
                        alt={user.username}
                      />
                      <h3>{user.username}</h3>
                      <button className="delet-button-posts" onClick={() => deleteChatSubmit(chat.id)}>Delete</button>
                    </div>
                  )
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
