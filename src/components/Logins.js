import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Logins({ onLogin }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (err) {
      alert("שגיאה בהתחברות: " + err.message);
    }
  };

  return (
    <button className="button-main" onClick={handleLogin}>
      התחבר עם גוגל
    </button>
  );
} 