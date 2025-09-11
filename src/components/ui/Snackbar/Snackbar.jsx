import React, { useEffect, useState } from "react";
import "./snackbar.css";

const Snackbar = ({ message, type = "info", onClose,duration=3000 }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    },duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
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
