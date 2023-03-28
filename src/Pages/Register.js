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
              <label for="email">Email</label>
              <input name="email" type="text" placeholder="Email"></input>
            </div>
            <div className="input-container">
              <label for="fullname">Fullname</label>
              <input name="fullname" type="text" placeholder="Email"></input>
            </div>
            <div className="input-container">
              <label for="username">Username</label>
              <input name="username" type="text" placeholder="Email"></input>
            </div>
            <div className="input-container">
              <label for="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <div className="input-container">
              <label for="confirm-password">Confirm password</label>
              <input
                name="confirm-password"
                type="password"
                placeholder="Password"
              ></input>
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
