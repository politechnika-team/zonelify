import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });

      navigate("/")
      
    } catch (error) {
      setErr(true)
    }
 
  };
  return (
    <div className="login-site">
      <div className="logo-container">
        <h1>Zonelify</h1>
        <h2>
          Stay in touch with your{" "}
          <span style={{ color: "white" }}>friends</span>
        </h2>
      </div>
      <div className="register-wrapper">
        <div className="login-container">
          <h1>Create account</h1>
          <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <button>Sign up</button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
          <p>
            You do have account? <Link to="/login">LogIn</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
