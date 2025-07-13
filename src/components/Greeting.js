import React from "react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "בוקר טוב";
  if (hour < 17) return "צהריים טובים";
  return "ערב טוב";
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function Greeting({ displayName }) {
  return (
    <div className="bg-gray-800 rounded-xl px-6 py-4 text-white text-lg font-bold flex flex-col items-center shadow-md">
      <span>{displayName}, {getGreeting()}!</span>
      <span className="text-sm text-gray-300 mt-1">השעה עכשיו: {getCurrentTime()}</span>
    </div>
  );
}
