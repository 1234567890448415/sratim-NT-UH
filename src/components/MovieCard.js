import React, { useState } from "react";
import MoviePlayer from "./MoviePlayer";

export default function MovieCard({ movie }) {
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlayClick = () => {
    setShowPlayer(true);
  };

  return (
    <>
      <div className="movie-card cursor-pointer" onClick={handlePlayClick}>
        <img
          src={movie.posterUrl || "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=400&q=80"}
          alt={movie.name}
          className="movie-poster"
        />
        <div className="movie-content">
          <div className="movie-title">{movie.name}</div>
          <div className="movie-desc">{movie.description}</div>
          <button 
            className="button-main mt-4 w-full"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayClick();
            }}
          >
            צפה בסרט
          </button>
        </div>
      </div>
      
      {showPlayer && (
        <MoviePlayer 
          movie={movie} 
          onClose={() => setShowPlayer(false)} 
        />
      )}
    </>
  );
}
