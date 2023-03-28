import React from "react";

export default function Login() {
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
          <form>
            <div className="input-container">
              <p>Email</p>
              <input type="text" placeholder="Email"></input>
            </div>
            <div className="input-container">
              <p>Full Name</p>
              <input type="text" placeholder="Email"></input>
            </div>
            <div className="input-container">
              <p>Username</p>
              <input type="text" placeholder="Email"></input>
            </div>
            <div className="input-container">
              <p>Password</p>
              <input type="password" placeholder="Password"></input>
            </div>
            <div className="input-container">
              <p>Confirm Password</p>
              <input type="password" placeholder="Password"></input>
            </div>
            <div className="btn-container">
              <button className="login-btn">Create New Account</button>
            </div>
          </form>
          <p>
            Don't have account? <a href="/register">Create new account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
