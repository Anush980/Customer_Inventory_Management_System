import React, { useEffect, useState } from 'react';
import "./inventoryStats.css";

const InventoryStats = ({ variant = "low" }) => {
  // variant = "low" | "out"
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Use the variant to filter: low or out
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/inventory?stock=${variant}`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [variant]);

  if (loading) return <p>Loading...</p>;
  if (!items.length) return <p>No items found.</p>;

  return (
    <div className="inventory-stats-wrapper">
      <div className="inventory-stats-header">
        <h3>{variant === "low" ? "Low Stock Items" : "Out of Stock Items"}</h3>
      </div>

      <div className="inventory-stats">
        {items.map((item) => (
          <div className={`stat ${variant}`} key={item._id}>
            <div className="image-wrapper">
              <img src={item.image || '/default.jpg'} alt={item.itemName} width="45" />
            </div>
            <div className="stat-info">
              <h4>{item.itemName}</h4>
              <p>SKU: {item.sku || 'null'}</p>
              {variant === "low" && (
                <progress 
                  value={item.stock} 
                  max={item.restock || 5} 
                  className='progress-bar'
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
