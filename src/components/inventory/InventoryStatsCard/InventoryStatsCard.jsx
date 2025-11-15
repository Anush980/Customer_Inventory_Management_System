import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../styles/statsCard.css';
import { useInventory } from '../../../hooks/useInventory';

const InventoryStatsCard = ({ variant = "total" }) => {
  // Fetch all items
  const { items } = useInventory();

  // Filter items based on variant
  let filteredItems = items;

  if (variant === "low") {
    filteredItems = items.filter(item => item.stock > 0 && item.stock < item.restock);
  } else if (variant === "out") {
    filteredItems = items.filter(item => item.stock <= 0);
  }

  const totalItems = filteredItems.length;

  // Example: new items this month
  const now = new Date();
  const newThisMonth = filteredItems.filter(item => {
    const created = new Date(item.createdAt);
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  const isPositive = newThisMonth >= 0;
  const change = newThisMonth;

  const headers = {
    total: "Total Items Available",
    low: "Low Stock Items",
    out: "Out of Stock Items"
  };

  return (
    <div className={`stat-card ${variant}`}>
      <h3>{headers[variant]}</h3>
      <div className="value">{totalItems}</div>
      <div
  className={`change ${
    variant === "low" ? "low-stock" : variant === "out" ? "out-of-stock" : isPositive ? "positive" : "negative"
  }`}
>
  <FontAwesomeIcon icon={isPositive ? "arrow-up" : "arrow-down"} className="icon" />
  <span>{Math.abs(change)} new this month</span>
</div>


    </div>
  );
};

export default InventoryStatsCard;
