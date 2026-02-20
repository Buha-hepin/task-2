import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div
        style={{
          left: position.x - 25 + "px",
          top: position.y - 25 + "px",
        }}
        className="pointer-events-none fixed w-12 h-12 bg-white rounded-full opacity-90 blur-3xl transition-transform duration-100 ease-out z-50"
      />
    </>
  );
};

export default CustomCursor;