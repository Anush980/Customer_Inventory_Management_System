import React from "react";
import "./inventoryStats.css";
import { useInventory } from "../../../hooks/useInventory";

const InventoryStats = ({ variant = "low", limit = 5 }) => {
  const { items, loading, error } = useInventory({ stock: variant });

 
  const displayItems = items.slice(0, limit);

  return (
    <div className="inventory-stats-wrapper">
      <div className="inventory-stats-header">
        <h3>{variant === "low" ? "Low Stock Items" : "Out of Stock Items"}</h3>
      </div>

      <div className="inventory-stats scrollable">
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && displayItems.length === 0 && (
          <p className="no-items">No {variant === "low" ? "low" : "out of stock"} items</p>
        )}

        {!loading &&
          !error &&
          displayItems.map((item) => (
            <div className={`stat ${variant}`} key={item._id}>
              <div className="image-wrapper">
                <img
                  src={item.image || "images/default.jpg"}
                  alt={item.itemName}
                  width="45"
                />
              </div>
              <div className="stat-info">
                <h4>{item.itemName}</h4>
                <p>SKU: {item.sku || "null"}</p>
                {variant === "low" && (
                  <progress
                    value={item.stock}
                    max={Math.max(item.restock || 5, item.stock)}
                    className="progress-bar"
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InventoryStats;
