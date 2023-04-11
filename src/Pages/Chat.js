import { useState, useEffect, useContext } from "react";

import UsersList from "../components/UsersList";
import ChatRoom from "../components/ChatRoom";
import "../css/Chat.css";

export default function Chat() {
  const [recipientId, setRecipientId] = useState(null);

  function handleSelectUser(userId) {
    setRecipientId(userId);
  }

  return (
    <div className="pages-container">
      <div className="users-list">
        <UsersList onSelectUser={handleSelectUser} />
      </div>

      <div className="chat-container">
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
