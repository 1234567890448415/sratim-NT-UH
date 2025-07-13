import React, { useState, useEffect } from "react";
import UploadToCloudinary from "../components/UploadToCloudinary";
import { loadMovies, addMovie, deleteMovie, addToNewMovies, removeFromNewMovies, loadNewMovies } from "../utils/movieStorage";

export default function Admin() {
  const [showLogin, setShowLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  
  // טופס הוספת סרט
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      const allMovies = loadMovies();
      const newMovieIds = loadNewMovies();
      setMovies(allMovies);
      setNewMovies(newMovieIds);
    }
  }, [isAdmin]);

  function handleLogin(e) {
    e.preventDefault();
    if (password === "בננה1234") {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("סיסמה שגויה");
    }
  }

  const handlePosterUpload = (url) => {
    setPosterUrl(url);
  };

  const handleVideoUpload = (url) => {
    setVideoUrl(url);
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    
    if (!movieName || !description || !posterUrl || !videoUrl) {
      alert("אנא מלא את כל השדות");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newMovie = addMovie({
        name: movieName,
        description: description,
        posterUrl: posterUrl,
        videoUrl: videoUrl
      });

      // רענון רשימת הסרטים
      setMovies(loadMovies());
      
      // איפוס הטופס
      setMovieName("");
      setDescription("");
      setPosterUrl("");
      setVideoUrl("");
      
      alert("הסרט נוסף בהצלחה!");
    } catch (error) {
      alert("שגיאה בהוספת הסרט");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMovie = (movieId) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק סרט זה?")) {
      deleteMovie(movieId);
      setMovies(loadMovies());
      setNewMovies(loadNewMovies());
    }
  };

  const handleToggleNewMovie = (movieId) => {
    const isNew = newMovies.includes(movieId);
    if (isNew) {
      removeFromNewMovies(movieId);
    } else {
      addToNewMovies(movieId);
    }
    setNewMovies(loadNewMovies());
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        פאנל ניהול
      </h1>
      
      {showLogin ? (
        <form
          onSubmit={handleLogin}
          className="bg-[#23283b] rounded-2xl p-8 max-w-md mx-auto shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-white text-center">כניסת מנהל</h2>
          <label className="block mb-2 text-white font-bold">סיסמה</label>
          <input
            type="password"
            className="search-bar mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="הכנס סיסמה"
            required
          />
          <button className="button-main w-full" type="submit">
            כניסה
          </button>
        </form>
      ) : (
        <div className="admin-panel">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">העלאת סרט חדש</h2>
          
          <form onSubmit={handleAddMovie} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-white font-bold">שם הסרט</label>
                <input 
                  className="search-bar" 
                  placeholder="שם הסרט" 
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-white font-bold">תיאור</label>
                <textarea 
                  className="search-bar min-h-[100px] resize-none" 
                  placeholder="תיאור הסרט"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block mb-2 text-white font-bold">העלה תמונת פוסטר</label>
                <UploadToCloudinary 
                  type="image" 
                  onUploadComplete={handlePosterUpload}
                />
              </div>
              <div>
                <label className="block mb-2 text-white font-bold">העלה קובץ סרט</label>
                <UploadToCloudinary 
                  type="video" 
                  onUploadComplete={handleVideoUpload}
                />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <button 
                type="submit"
                disabled={isSubmitting || !movieName || !description || !posterUrl || !videoUrl}
                className="button-main text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "מוסיף סרט..." : "העלה סרט"}
              </button>
            </div>
          </form>

          {/* ניהול סרטים */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-white">ניהול סרטים</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movies.map((movie) => (
                <div key={movie.id} className="bg-[#23283b] rounded-lg p-4">
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-white font-bold mb-2">{movie.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{movie.description}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleNewMovie(movie.id)}
                      className={`text-xs px-3 py-1 rounded-full ${
                        newMovies.includes(movie.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {newMovies.includes(movie.id) ? 'חדש' : 'הוסף לחדשים'}
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="text-xs px-3 py-1 rounded-full bg-red-600 text-white"
                    >
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-10 text-gray-400">מנהל</div>
    </div>
  );
}