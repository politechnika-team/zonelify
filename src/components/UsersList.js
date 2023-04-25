import { useState, useEffect, useContext } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

function UsersList({ onSelectUser }) {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const usersRef = collection(db, "users");

    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const userList = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUser.uid); // filter out the current user
      setUsers(userList);
    });

    return () => unsubscribe();
  }, [currentUser.uid]);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li
            style={{
              backgroundImage: "url(" + user.photoURL + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="user"
            key={user.id}
            onClick={() => onSelectUser(user.id)}
          >
            {user.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
