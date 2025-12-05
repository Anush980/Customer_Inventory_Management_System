import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/statsCard.css';
import { useSales } from '../../hooks/useSales';

const TotalSalesStats = ({ variant = "daily" }) => {
  const { sales = [] } = useSales();
  const now = new Date();

  // Total items sold
  const totalItemsSold = useMemo(() => {
    return sales.reduce((sum, sale) => {
      const qty = sale.items?.reduce((s, item) => s + (item.quantity || 0), 0) || 0;
      return sum + qty;
    }, 0);
  }, [sales]);

  // Monthly items sold
  const monthlyItemsSold = useMemo(() => {
    return sales
      .filter(sale => {
        const created = new Date(sale.createdAt);
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      })
      .reduce((sum, sale) => {
        const qty = sale.items?.reduce((s, item) => s + (item.quantity || 0), 0) || 0;
        return sum + qty;
      }, 0);
  }, [sales, now]);

  // Daily items sold
  const dailyItemsSold = useMemo(() => {
    const todayStr = now.toISOString().split("T")[0];
    return sales
      .filter(sale => sale.createdAt.split("T")[0] === todayStr)
      .reduce((sum, sale) => {
        const qty = sale.items?.reduce((s, item) => s + (item.quantity || 0), 0) || 0;
        return sum + qty;
      }, 0);
  }, [sales, now]);

  // Decide which value to show
  let itemsSold = 0;
  let previousItemsSold = 0;
  let title = "";

  switch (variant) {
    case "daily":
      itemsSold = dailyItemsSold;
      previousItemsSold = sales
        .filter(sale => sale.createdAt.split("T")[0] === new Date(now.getTime() - 86400000).toISOString().split("T")[0])
        .reduce((sum, sale) => sum + (sale.items?.reduce((s, i) => s + (i.quantity || 0), 0) || 0), 0);
      title = "Today's Sales";
      break;
    case "monthly":
      itemsSold = monthlyItemsSold;
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      previousItemsSold = sales
        .filter(sale => {
          const created = new Date(sale.createdAt);
          return created.getMonth() === lastMonth.getMonth() && created.getFullYear() === lastMonth.getFullYear();
        })
        .reduce((sum, sale) => sum + (sale.items?.reduce((s, i) => s + (i.quantity || 0), 0) || 0), 0);
      title = "Monthly Sales";
      break;
    case "total":
    default:
      itemsSold = totalItemsSold;
      previousItemsSold = 0;
      title = "Total Sales";
  }

  // Percentage change
  const percentage = previousItemsSold ? ((itemsSold - previousItemsSold) / previousItemsSold) * 100 : 0;
  const isPositive = percentage >= 0;

  return (
    <div className="stat-card sales">
      <h3>{title}</h3>
      <div className="value">{itemsSold}</div>
      {variant !== "total" && (
        <div className={`change ${isPositive ? "positive" : "negative"}`}>
          <FontAwesomeIcon icon={isPositive ? "arrow-up" : "arrow-down"} className="icon" />
          <span>{percentage.toFixed(1)}% {isPositive ? "increase" : "decrease"}</span>
        </div>
      )}
    </div>
  );
};

export default TotalSalesStats;
