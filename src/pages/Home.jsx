import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCursor from "../component/CustomCursor";
import Button from "../component/Button";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [supported, setSupported] = useState(true); // Check support on load

  // Check support on component mount
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      setSupported(false);
    }
  }, []);

  const handleStart = () => {
    if (supported) {
      navigate("/screen-test"); // Navigate only if supported
    } else {
      setError("Screen sharing is not supported in this browser.");
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="relative min-h-screen bg-black opacity-95 overflow-hidden flex items-center justify-center px-6">

        {/* 🌌 Background stars */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

        {/* 💫 Floating blurred shapes */}
        <div className="absolute w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-blob top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-40 right-20"></div>
        <div className="absolute w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-10 left-1/4"></div>

        {/* 🎨 Main Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start max-w-6xl w-full gap-12">
          
          {/* Left side: Website Name */}
          <div className="flex-1 text-left">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              Screen-Share Pro
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-6">
              Instantly test your browser's screen sharing capabilities.  
              Safe, fast, and modern.
            </p>

            {/* ✅ Reusable Button */}
            <Button
              onClick={handleStart}
              disabled={!supported}
              className={`${!supported ? "opacity-50 cursor-not-allowed" : ""} w-full md:w-auto text-white`}
            >
              Start Screen Test
            </Button>

            {/* Browser unsupported message */}
            {!supported && (
              <p className="mt-4 text-red-400 font-medium">
                Your browser does not support screen sharing.
              </p>
            )}

            {/* Error after click (optional) */}
            {error && (
              <p className="mt-2 text-red-400 font-medium">{error}</p>
            )}
          </div>

          {/* Right side: Illustration */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4149/4149643.png"
              alt="Screen sharing illustration"
              className="w-80 md:w-96 drop-shadow-2xl animate-float filter opacity-40 brightness-0 invert"
            />
          </div>
        </div>

        {/* 🔧 CSS Animations */}
        <style>{`
          @keyframes blob {
            0% { transform: translate(0px,0px) scale(1); }
            33% { transform: translate(30px,-50px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
            100% { transform: translate(0px,0px) scale(1); }
          }
          .animate-blob { animation: blob 12s infinite; }

          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }
        `}</style>
      </div>
    </>
  );
};

export default Home;