import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UsersList from "../components/UsersList";
import ChatRoom from "../components/ChatRoom";
import "../css/Chat.css";

export default function Chat() {
  const [recipientId, setRecipientId] = useState(null);
  const { darkMode, setDarkMode } = useContext(AuthContext);
  function handleSelectUser(userId) {
    setRecipientId(userId);
  }

  return (
    <div className="pages-container">
      <div className="users-list">
        <UsersList onSelectUser={handleSelectUser} />
      </div>

        <div className={`chat-container ${darkMode ? "dark-mode" : "light-mode"}`}>
        {recipientId ? (
          <ChatRoom recipientId={recipientId} />
        ) : (
          <p>Please select a user to chat with</p>
        )}
      </div>
    </div>
  );
}

// <div className="pages-container">
//       <div className="chat-container"></div>
