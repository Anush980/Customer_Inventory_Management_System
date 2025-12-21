import React, { useEffect, useState } from "react";
import "./snackbar.css";

const Snackbar = ({ message, type = "info", onClose, duration = 3000 }) => {
  const [closing, setClosing] = useState(false);

  // Auto-close after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setClosing(true);
      const closeTimer = setTimeout(onClose, 300); // wait for slide-down animation
      return () => clearTimeout(closeTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Close button handler
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // wait for slide-down animation
  };

  return (
    <div className={`snackbar snackbar-${type} ${closing ? "slide-down" : "slide-up"}`}>
      <span>{message}</span>
      <button className="snackbar-close" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
