import React, { useState } from "react";

export default function Admin() {
  const [showLogin, setShowLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    if (password === "בננה1234,") {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("סיסמה שגויה");
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">פאנל ניהול</h1>
      {showLogin ? (
        <form
          onSubmit={handleLogin}
          className="bg-[#23283b] rounded-2xl p-8 max-w-md mx-auto shadow-lg"
        >
          <label className="block mb-2 text-white font-bold">סיסמה</label>
          <input
            type="password"
            className="search-bar mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="הכנס סיסמה"
          />
          <button className="button-main w-full" type="submit">
            כניסה
          </button>
        </form>
      ) : (
        <div className="admin-panel">
          <h2 className="text-xl font-bold mb-4">העלאת סרט חדש</h2>
          <form>
            <label>שם הסרט</label>
            <input className="mb-2" placeholder="שם הסרט" />
            <label>תיאור</label>
            <textarea className="mb-2" placeholder="תיאור הסרט" />
            <label>העלה קובץ סרט</label>
            <input type="file" className="mb-2" />
            <label>העלה תמונת פוסטר</label>
            <input type="file" className="mb-2" />
            <button className="button-main w-full mt-4" type="submit">
              העלה סרט
            </button>
          </form>
        </div>
      )}
      <div className="text-center mt-10 text-gray-400">מנהל</div>
    </div>
  );
}