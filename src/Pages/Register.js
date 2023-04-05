import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      navigate("/");
    } catch (error) {
      setErr(true);
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
            <div className="input-container">
              <label htmlFor="display-name">Name</label>
              <input
                required
                name="display-name"
                type="text"
                placeholder="display name"
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input required name="email" type="text" placeholder="email" />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                required
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
            <div className="btn-container">
              <button className="login-btn">Sign up</button>
            </div>
            {/* {err && <span>Something went wrong</span>} */}
          </form>
          <p>
            You do have account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
