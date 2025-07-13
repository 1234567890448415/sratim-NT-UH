import React from "react";
import { Link, useLocation } from "react-router-dom";
import Greeting from "./Greeting";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "בוקר טוב";
  if (hour < 17) return "צהריים טובים";
  return "ערב טוב";
}

export default function NavBar({ user, onLogout }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="header-bar">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-red-400 transition-colors">
          <span className="text-red-400 text-3xl">🎬</span>
          <span>סרטים NT&UH</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-6">
        <Link
          to="/movies"
          className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
            isActive("/movies") 
              ? "bg-red-500 text-white shadow-lg" 
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          כל הסרטים
        </Link>
        <Link
          to="/suggest"
          className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
            isActive("/suggest") 
              ? "bg-red-500 text-white shadow-lg" 
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          הצע סרט
        </Link>
        <Link
          to="/admin"
          className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
            isActive("/admin") 
              ? "bg-red-500 text-white shadow-lg" 
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          מנהל
        </Link>
        {/* ברכת שם משתמש מעוצבת */}
        {user && (
          <div className="ml-4">
            <Greeting displayName={user.displayName} />
          </div>
        )}
        {/* כפתור התנתקות */}
        {user && (
          <button className="button-main px-4 py-2 text-sm" onClick={onLogout}>
            התנתק
          </button>
        )}
      </div>
    </nav>
  );
}