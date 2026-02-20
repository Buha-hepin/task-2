import React from "react";
import { useNavigate } from "react-router-dom";
import { useScreenShare } from "../hooks/UseScreenShare";
import Button from "../component/Button";
import CustomCursor from "../component/CustomCursor";

const ScreenTest = () => {
  const navigate = useNavigate();
  const { state, errorMessage, stream, videoRef, startScreenShare } = useScreenShare();

  return (
    <>
    <CustomCursor />
    <div className="relative min-h-screen bg-black opacity-95 flex flex-col items-center justify-center px-4 overflow-hidden text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center mix-blend-overlay opacity-40"></div>

      {/* Floating shapes */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-40 right-20"></div>
      <div className="absolute w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-10 left-1/4"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-3xl w-full text-center flex flex-col items-center gap-6 shadow-2xl">
        <h1 className="text-4xl font-bold    text-white text-3xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Screen Test Page</h1>
        <p className="text-gray-200 mb-2">
          {state === "granted" ? "Screen share active" : "Click the button to start screen test."}
        </p>

        {/* Progress bar */}
        <div className="h-3 w-64 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-500  "
            style={{
              width:
                state === "idle"
                  ? "0%"
                  : state === "requesting"
                  ? "50%"
                  : state === "granted"
                  ? "100%"
                  : "25%",
            }}
          />
        </div>

        {/* Buttons */}
        {state !== "granted" && <Button onClick={startScreenShare}>{state === "idle" ? "Start Screen Test" : "Retry Screen Test"}</Button>}

        {(state === "idle" || state === "cancelled" || state === "denied" || state === "error") && (
          <Button
            className="bg-gray-700 hover:bg-gray-600 "
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        )}

        {/* Video preview */}
        {state === "granted" && stream && (
          <video ref={videoRef} className="mt-6 w-full rounded-xl shadow-2xl" autoPlay controls />
        )}

        {/* Error */}
        {(state === "cancelled" || state === "denied" || state === "error") && (
          <p className="mt-4 text-red-400">{errorMessage}</p>
        )}
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(50px,-80px) scale(1.1); }
          66% { transform: translate(-80px,-50px) scale(0.9); }
          100% { transform: translate(0px,0px) scale(1); }
        }
        .animate-blob { animation: blob 12s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
    </>
  );
};

export default ScreenTest;