import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './statsCard.css';

const StatsCard = ({ value, change,type }) => {
  const isPositive = change >= 0;
  let periodText;
  let title;
let classType= type.toLowerCase();
  switch(classType){

    case "revenue":
      periodText = "from last month";
      title = "Total Revenue"
      break;
    case "sales":
      periodText = "from yesterday";
      title="Today's Sales"
      break;
    case "customer":
      periodText = "in customers";
      title="Total Customer" 
      break;
    case "inventory":
      periodText = "in stocks ";
      title="Low Stock Items" 
      break;
    case "allinventory":
      periodText = "in stocks ";
      title="Total Stock Items" 
      break;
    default:
      periodText = "";
  }
  

  return (
    <div className={`stat-card ${classType}`}>
      <h3>{title}</h3>
      <div className="value"> {value}</div>
      <div className={`change ${isPositive ? "positive" : "negative"}`}>
        <FontAwesomeIcon icon={isPositive ? "arrow-up" : "arrow-down"} className="icon" />
        <span>{Math.abs(change)}% {periodText}</span>
      </div>
    </div>
  )
}

export default StatsCard;
