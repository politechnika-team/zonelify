import { useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    if (!recipientId) {
      return;
    }

    const db = getFirestore();
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("senderId", "in", [getAuth().currentUser.uid, recipientId]),
      where("recipientId", "in", [getAuth().currentUser.uid, recipientId])
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

  function sendMessage(event) {
    event.preventDefault();

    const db = getFirestore();
    const messagesRef = collection(db, "messages");

    addDoc(messagesRef, {
      text: messageText,
      senderId: getAuth().currentUser.uid,
      recipientId: recipientId,
    });

    setMessageText("");
  }

  return (
    <div>
      <div>
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
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
