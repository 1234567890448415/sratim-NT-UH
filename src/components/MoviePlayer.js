import React from "react";

export default function MoviePlayer({ movie, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="video-modal" onClick={handleBackdropClick}>
      <div className="video-container">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
          >
            ✕
          </button>
          <video
            src={movie.videoUrl}
            controls
            autoPlay
            className="w-full h-auto max-h-[80vh]"
            poster={movie.posterUrl}
          >
            הדפדפן שלך לא תומך בנגינת וידאו.
          </video>
        </div>
        <div className="p-6 bg-gray-900">
          <h3 className="text-xl font-bold text-white mb-2">{movie.name}</h3>
          <p className="text-gray-300">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
