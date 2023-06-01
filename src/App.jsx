import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Signup";
import { AuthContext } from "./store/FirebaseContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./store/PostContext";
import { SearchProvider } from "./store/searchContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <SearchProvider>
        <Post>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
              <Route path="/viewpost" element={<ViewPost />} />
            </Routes>
          </Router>
        </Post>
      </SearchProvider>
    </div>
  );
}

export default App;
