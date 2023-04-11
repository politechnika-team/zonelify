import { useState, useEffect, useContext } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "../css/Chat.css";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [recipientId, setRecipientId] = useState(null);
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const db = getFirestore();
    const usersRef = collection(db, "users");

    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, []);

  function sendMessage(event) {
    event.preventDefault();

    const messagesRef = collection(db, "messages");

    addDoc(messagesRef, {
      text: messageText,
      senderId: getAuth().currentUser.uid,
      recipientId: recipientId,
    });

    setMessageText("");
  }

  useEffect(() => {
    if (!recipientId) {
      return;
    }

    const db = getFirestore();
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("senderId", "==", recipientId),
      where("recipientId", "==", getAuth().currentUser.uid)
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
  console.log(currentUser, " current user");

  return (
    <div className="pages-container">
      <div className="chat-container">
        <select onChange={(event) => setRecipientId(event.target.value)}>
          <option value={null}>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.displayName}
              {console.log(user)}
            </option>
          ))}
        </select>

        <div>
          {messages.map((message) => (
            <div key={message.id}>
              <p>{message.text}</p>
              <p>{message.senderId}</p>
              <p>{message.recipientId}</p>
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
    </div>
  );
}

// <div className="pages-container">
//       <div className="chat-container"></div>
