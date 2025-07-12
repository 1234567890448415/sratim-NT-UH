import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  return (
    <nav className="header-bar flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-red-400">🎬</span> סרטים NT&UH
        </Link>
        <Link
          to="/movies"
          className={`hover:text-red-400 transition ${
            location.pathname === "/movies" ? "text-red-400" : ""
          }`}
        >
          כל הסרטים
        </Link>
        <Link
          to="/suggest"
          className={`hover:text-red-400 transition ${
            location.pathname === "/suggest" ? "text-red-400" : ""
          }`}
        >
          הצע סרט
        </Link>
        <Link
          to="/admin"
          className={`hover:text-red-400 transition ${
            location.pathname === "/admin" ? "text-red-400" : ""
          }`}
        >
          מנהל
        </Link>
      </div>
    </nav>
  );
}