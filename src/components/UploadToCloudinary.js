import React, { useState } from "react";

const CLOUD_NAME = "yedidmovies"; // לדוג' השם שלך ב-Cloudinary
const UPLOAD_PRESET = "unsigned_preset"; // לדוג' השם של ה-upload preset

export default function UploadToCloudinary() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    setVideoUrl(data.secure_url);
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>העלה ל-Cloudinary</button>
      {videoUrl && (
        <video src={videoUrl} controls width="400" />
      )}
    </div>
  );
}