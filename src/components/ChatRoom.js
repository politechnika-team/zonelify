import { useState, useEffect, useContext, useRef } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

function ChatRoom({ recipientId }) {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!recipientId) {
      return;
    }

    const db = getFirestore();
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("senderId", "in", [getAuth().currentUser.uid, recipientId]),
      where("recipientId", "in", [getAuth().currentUser.uid, recipientId]),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [recipientId]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(event) {
    event.preventDefault();

    const db = getFirestore();
    const messagesRef = collection(db, "messages");

    addDoc(messagesRef, {
      text: messageText,
      senderId: getAuth().currentUser.uid,
      recipientId: recipientId,
      createdAt: new Date(),
    });

    setMessageText("");
  }

  return (
    <div>
      <div className="messages-align">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.senderId === currentUser.uid ? "sent" : "received"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
