import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div
        className="w-full h-64 flex items-center justify-center bg-cover bg-center rounded-2xl shadow-lg mb-8"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80')",
        }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-2xl">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            ברוכים הבאים ל-NT&UH 🎬
          </h1>
          <p className="text-lg text-gray-200 text-center">
            חווית קולנוע מודרנית • חפש סרטים, גלה חדשים, ותהנה!
          </p>
        </div>
      </div>
      <div className="w-full max-w-xl">
        <input
          className="search-bar w-full"
          placeholder="חפש סרט..."
        />
      </div>
      <div className="w-full max-w-5xl mt-16">
        <h2 className="text-2xl font-bold mb-6 text-white">הסרטים החדשים ביותר</h2>
        {/* כאן תוצג רשימת הסרטים החדשים */}
        <div className="flex flex-wrap gap-6 justify-center">
          {/* דוגמת כרטיס סרט */}
          <div className="movie-card">
            <img
              src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=400&q=80"
              alt="Movie"
            />
            <div className="movie-title">סרט לדוגמה</div>
            <div className="movie-desc">זהו סרט לדוגמה. כאן יופיע תיאור קצר של הסרט.</div>
          </div>
        </div>
      </div>
    </div>
  );
}