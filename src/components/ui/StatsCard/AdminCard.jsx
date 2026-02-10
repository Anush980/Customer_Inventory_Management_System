// src/components/ui/StatsCard/StatsCard.jsx
import React from "react";
import "./statsCard.css";

const AdminCard = ({ title, count, variant }) => {

  return (
    <div className={`stat-card ${variant}`}>
      <h3>{title}</h3>
      <div className="value">{count}</div>
    </div>
  );
};

export default AdminCard;
