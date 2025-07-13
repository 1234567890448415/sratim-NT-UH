import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { loadMovies, loadNewMovies } from "../utils/movieStorage";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const allMovies = loadMovies();
    const newMovieIds = loadNewMovies();
    setMovies(allMovies);
    setNewMovies(allMovies.filter(movie => newMovieIds.includes(movie.id)));
  }, []);

  const filteredNewMovies = newMovies.filter(movie =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cinema-bg min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-[80vh] relative">
        {/* רקע קולנוע */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          {/* כותרת ראשית */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              ברוכים הבאים ל-NT&UH 🎬
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              חווית קולנוע מודרנית • חפש סרטים, גלה חדשים, ותהנה!
            </p>
          </div>

          {/* שורת חיפוש */}
          <div className="w-full max-w-2xl mx-auto mb-16">
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

          {/* סרטים חדשים */}
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-white text-center">
              הסרטים החדשים ביותר
            </h2>
            
            {filteredNewMovies.length > 0 ? (
              <div className="flex flex-wrap gap-6 justify-center">
                {filteredNewMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <p className="text-lg">אין סרטים חדשים כרגע</p>
                <p className="text-sm mt-2">הוסף סרטים חדשים דרך דף המנהל</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}