import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
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
      <div className="login-wrapper">
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input name="email" type="text" placeholder="Email"></input>
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <div className="btn-container">
              <button className="login-btn">Login</button>
            </div>
          </form>
          <p>
            Don't have account? <Link to="/register">Create new account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
