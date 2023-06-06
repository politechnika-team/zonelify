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
import SideMenu from "./SideMenu";
import Search from "./Pages/Search";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Chat from "./Pages/Chat";
import News from "./Pages/News";
import Notes from "./Pages/Notes";
import ErrorPage from "./Pages/ErrorPage";

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
    <Router basename="/zonelify">
      {currentUser && <SideMenu />}
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:displayName"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="daily"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          <Route
            path="notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
