import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { loadMovies } from "../utils/movieStorage";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const allMovies = loadMovies();
    setMovies(allMovies);
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        כל הסרטים
      </h1>
      
      {/* שורת חיפוש */}
      <div className="w-full max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            className="search-bar text-center text-lg"
            placeholder="חפש סרט..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            🔍
          </div>
        </div>
      </div>

      {/* סטטיסטיקות */}
      <div className="stats-bar mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400">{movies.length}</div>
          <div className="stat-label">סרטים</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400">{filteredMovies.length}</div>
          <div className="stat-label">נמצאו</div>
        </div>
      </div>

      {/* רשימת סרטים */}
      {filteredMovies.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          {searchTerm ? (
            <>
              <p className="text-lg">לא נמצאו סרטים עבור "{searchTerm}"</p>
              <p className="text-sm mt-2">נסה לחפש משהו אחר</p>
            </>
          ) : (
            <>
              <p className="text-lg">אין סרטים כרגע</p>
              <p className="text-sm mt-2">הוסף סרטים דרך דף המנהל</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}