import React, { useMemo } from "react";
import "./topSales.css"; 

const TopSalesCard = ({ sales = [], limit = 5 }) => {
  const productStats = useMemo(() => {
    const stats = {};
    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        const prodId = item.product._id;
        if (!stats[prodId]) {
          stats[prodId] = { ...item.product, soldQty: 0 };
        }
        stats[prodId].soldQty += item.quantity;
      });
    });
    return Object.values(stats)
      .sort((a, b) => b.soldQty - a.soldQty)
      .slice(0, limit);
  }, [sales, limit]);

  if (sales.length === 0) return null;

  return (
    <div className="inventory-stats-wrapper">
      <div className="inventory-stats-header">
        <h3>Top Sold Products</h3>
      </div>

      <div className="inventory-stats scrollable">
        {productStats.length === 0 && <p>No sales yet</p>}

        {productStats.map((item) => (
          <div className="stat top-sales" key={item._id}>
            <div className="image-wrapper">
              <img
                src={item.image || "images/default.jpg"}
                alt={item.itemName}
                width="45"
              />
            </div>
            <div className="stat-info">
              <h4>{item.itemName}</h4>
              <p>SKU: {item.sku || "-"}</p>
              <p>Sold: {item.soldQty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSalesCard;
