// Button.jsx
import React from "react";

const Button = ({ children, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-transform  cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 cursor-pointer${
        disabled
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 cursor-pointer"
      } ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;