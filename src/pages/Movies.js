import React from "react";

export default function Movies() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">כל הסרטים</h1>
      <input
        className="search-bar w-full mb-8"
        placeholder="חפש סרט..."
      />
      <div className="flex flex-wrap gap-6 justify-center">
        {/* כאן תוצג רשימת כל הסרטים */}
        <div className="movie-card">
          <img
            src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=400&q=80"
            alt="Movie"
          />
          <div className="movie-title">סרט לדוגמה</div>
          <div className="movie-desc">תיאור קצר של הסרט...</div>
        </div>
      </div>
    </div>
  );
}