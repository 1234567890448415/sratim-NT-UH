import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Suggest from "./pages/Suggest";
import Admin from "./pages/Admin";
import Logins from "./components/Logins";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#111722] to-[#181e2a] text-gray-100">
        <NavBar user={user} onLogout={handleLogout} />
        
        {/* התחברות גוגל */}
        {!user && (
          <div className="text-center py-8">
            <Logins onLogin={handleLogin} />
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;