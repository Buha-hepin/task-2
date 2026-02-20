// useScreenShare.jsx
import { useState, useRef, useEffect } from "react";

export const useScreenShare = () => {
  const [state, setState] = useState("idle"); // idle, requesting, granted, cancelled, denied, error
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const stopAndReleaseStream = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startScreenShare = async () => {
    stopAndReleaseStream();
    setState("requesting");
    setErrorMessage("");

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      setStream(screenStream);
      setState("granted");

      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
        videoRef.current.play().catch((err) => console.log(err));
      }

      const track = screenStream.getVideoTracks()[0];
      if (track) {
        track.onended = () => {
          setState("idle");
          setErrorMessage("Screen sharing stopped.");
          stopAndReleaseStream();
        };
      }
    } catch (err) {
      stopAndReleaseStream();
      if (err.name === "NotAllowedError") {
        setState("cancelled");
        setErrorMessage("User cancelled or denied permission.");
      } else if (err.name === "NotFoundError") {
        setState("denied");
        setErrorMessage("No screen found to share.");
      } else {
        setState("error");
        setErrorMessage(err.message || "Unknown error occurred.");
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAndReleaseStream();
  }, []);

  return { state, errorMessage, stream, videoRef, startScreenShare, stopAndReleaseStream };
};