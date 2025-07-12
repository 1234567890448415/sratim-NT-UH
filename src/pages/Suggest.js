import React, { useState } from "react";
import UploadToCloudinary from "../components/UploadToCloudinary";

export default function Suggest() {
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [posterUrl, setPosterUrl] = useState("");

  // העלאת תמונת פוסטר ל-Cloudinary (כמו העלאת סרט, רק ל-image/upload)
  const CLOUD_NAME = "הכנס_כאן_את_cloud_name_שלך";
  const UPLOAD_PRESET = "הכנס_כאן_את_upload_preset_שלך";

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handlePosterUpload = async (e) => {
    e.preventDefault();
    if (!poster) return;
    const formData = new FormData();
    formData.append("file", poster);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    setPosterUrl(data.secure_url);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">הצע סרט חדש</h1>
      <form className="bg-[#23283b] rounded-2xl p-8 max-w-xl mx-auto shadow-lg mb-8">
        <label className="block mb-2 text-white font-bold">שם הסרט</label>
        <input
          className="search-bar mb-4"
          placeholder="שם הסרט"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label className="block mb-2 text-white font-bold">תיאור</label>
        <textarea
          className="search-bar mb-4"
          placeholder="תיאור הסרט"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block mb-2 text-white font-bold">העלה תמונת פוסטר</label>
        <input type="file" accept="image/*" className="mb-2" onChange={handlePosterChange} />
        <button className="button-main w-full mb-4" onClick={handlePosterUpload} type="button">
          העלה פוסטר
        </button>
        {posterUrl && (
          <img src={posterUrl} alt="פוסטר" className="w-40 h-40 object-cover rounded-xl mx-auto mb-4" />
        )}
      </form>
      {/* העלאת סרט ל-Cloudinary */}
      <div className="bg-[#23283b] rounded-2xl p-8 max-w-xl mx-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-white">העלה קובץ סרט</h2>
        <UploadToCloudinary />
      </div>
    </div>
  );
}