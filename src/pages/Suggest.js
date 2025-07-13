import React, { useState } from "react";
import UploadToCloudinary from "../components/UploadToCloudinary";
import { addMovie } from "../utils/movieStorage";

export default function Suggest() {
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePosterUpload = (url) => {
    setPosterUrl(url);
  };

  const handleVideoUpload = (url) => {
    setVideoUrl(url);
  };

  const handleSubmit = async (e) => {
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

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        הצע סרט חדש
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="bg-[#23283b] rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">
            פרטי הסרט
          </h2>
          
          <div className="mb-6">
            <label className="block mb-2 text-white font-bold">שם הסרט</label>
            <input
              className="search-bar"
              placeholder="שם הסרט"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
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

        {/* העלאת פוסטר */}
        <div className="bg-[#23283b] rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">העלה תמונת פוסטר</h2>
          <UploadToCloudinary 
            type="image" 
            onUploadComplete={handlePosterUpload}
          />
          {posterUrl && (
            <div className="mt-4 text-center">
              <img 
                src={posterUrl} 
                alt="פוסטר" 
                className="w-40 h-40 object-cover rounded-xl mx-auto"
              />
            </div>
          )}
        </div>

        {/* העלאת סרט */}
        <div className="bg-[#23283b] rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">העלה קובץ סרט</h2>
          <UploadToCloudinary 
            type="video" 
            onUploadComplete={handleVideoUpload}
          />
        </div>

        {/* כפתור שליחה */}
        <div className="text-center">
          <button 
            type="submit"
            disabled={isSubmitting || !movieName || !description || !posterUrl || !videoUrl}
            className="button-main text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "מוסיף סרט..." : "הוסף סרט"}
          </button>
        </div>
      </form>
    </div>
  );
}