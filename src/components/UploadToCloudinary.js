import React, { useState } from "react";

const CLOUD_NAME = "yedidmovies"; // לדוג' השם שלך ב-Cloudinary
const UPLOAD_PRESET = "unsigned_preset"; // לדוג' השם של ה-upload preset

export default function UploadToCloudinary({ onUploadComplete, type = "video" }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      
      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
        if (onUploadComplete) {
          onUploadComplete(data.secure_url);
        }
      }
    } catch (error) {
      console.error("שגיאה בהעלאה:", error);
      alert("שגיאה בהעלאת הקובץ");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="file-input-container">
        <input 
          type="file" 
          accept={type === "video" ? "video/*" : "image/*"} 
          onChange={handleFileChange}
          className="file-input"
        />
        <button 
          onClick={handleUpload}
          disabled={!file || uploading}
          className="button-main w-full mt-4"
        >
          {uploading ? "מעלה..." : `העלה ${type === "video" ? "סרט" : "פוסטר"}`}
        </button>
      </div>
      
      {uploadedUrl && (
        <div className="uploaded-preview mt-4">
          {type === "video" ? (
            <video 
              src={uploadedUrl} 
              controls 
              className="w-full max-w-md rounded-lg"
            />
          ) : (
            <img 
              src={uploadedUrl} 
              alt="פוסטר" 
              className="w-40 h-40 object-cover rounded-xl"
            />
          )}
          <p className="text-green-400 text-sm mt-2">✓ הועלה בהצלחה</p>
        </div>
      )}
    </div>
  );
}