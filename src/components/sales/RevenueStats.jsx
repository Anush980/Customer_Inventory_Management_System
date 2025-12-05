import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/statsCard.css';
import { useSales } from '../../hooks/useSales';

const RevenueStats = ({ variant = "daily" }) => {
  const { sales = [] } = useSales();
  const now = new Date();

  // Total revenue
  const totalRevenue = useMemo(() => {
    return sales.reduce((sum, sale) => sum + (sale.total || 0), 0);
  }, [sales]);

  // Revenue this month
  const monthlyRevenue = useMemo(() => {
    return sales
      .filter(sale => {
        const created = new Date(sale.createdAt);
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      })
      .reduce((sum, sale) => sum + (sale.total || 0), 0);
  }, [sales, now]);

  // Revenue today
  const dailyRevenue = useMemo(() => {
    const todayStr = now.toISOString().split("T")[0]; // yyyy-mm-dd
    return sales
      .filter(sale => sale.createdAt.split("T")[0] === todayStr)
      .reduce((sum, sale) => sum + (sale.total || 0), 0);
  }, [sales, now]);

  // Previous day revenue
  const yesterdayRevenue = useMemo(() => {
    const yesterdayStr = new Date(now.getTime() - 86400000).toISOString().split("T")[0];
    return sales
      .filter(sale => sale.createdAt.split("T")[0] === yesterdayStr)
      .reduce((sum, sale) => sum + (sale.total || 0), 0);
  }, [sales, now]);

  // Previous month revenue
  const lastMonthRevenue = useMemo(() => {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return sales
      .filter(sale => {
        const created = new Date(sale.createdAt);
        return created.getMonth() === lastMonth.getMonth() && created.getFullYear() === lastMonth.getFullYear();
      })
      .reduce((sum, sale) => sum + (sale.total || 0), 0);
  }, [sales, now]);

  // Decide which revenue to show
  let revenueValue = 0;
  let previousRevenue = 0;
  let title = "";

  switch(variant) {
    case "daily":
      revenueValue = dailyRevenue;
      previousRevenue = yesterdayRevenue;
      title = "Today's Revenue";
      break;
    case "monthly":
      revenueValue = monthlyRevenue;
      previousRevenue = lastMonthRevenue;
      title = "Monthly Revenue";
      break;
    case "total":
    default:
      revenueValue = totalRevenue;
      previousRevenue = 0; // cannot calculate
      title = "Total Revenue";
  }

  // Percentage change
  const percentage = previousRevenue
    ? ((revenueValue - previousRevenue) / previousRevenue) * 100
    : 0;

  const isPositive = percentage >= 0;

  return (
    <div className="stat-card revenue">
      <h3>{title}</h3>
      <div className="value">₹{revenueValue}</div>
      {variant !== "total" && (
        <div className={`change ${isPositive ? "positive" : "negative"}`}>
          <FontAwesomeIcon icon={isPositive ? "arrow-up" : "arrow-down"} className="icon" />
          <span>{percentage.toFixed(1)}% {isPositive ? "increase" : "decrease"}</span>
        </div>
      )}
    </div>
  );
};

export default RevenueStats;
