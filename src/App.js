import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { currentUser } = useContext(AuthContext);

  if (currentUser && currentUser.photoURL === null) {
    currentUser.photoURL =
      "https://firebasestorage.googleapis.com/v0/b/zonelifyv2.appspot.com/o/profile-default.jpg?alt=media&token=7ebfddc9-b58f-400c-83c4-09497b7ae683";
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home
                  photoURL={currentUser?.photoURL}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile currentUser={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
