import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../styles/statsCard.css';
import { useCustomers } from '../../../hooks/useCustomer';

const CustomerStats = () => {
    //Fetch all customers
    const {customers}= useCustomers();
    const totalCustomers = customers.length;

      // Example: new customers this month
  const now = new Date();
  const newThisMonth = customers.filter(c => {
    const created = new Date(c.createdAt); 
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;


    const isPositive= newThisMonth>=0;
    const change = newThisMonth;

  return (
  
     <div className={`stat-card customer`}>
   <h3>Total Customers</h3>
   <div className="value">{totalCustomers}</div>
      <div className={`change ${isPositive ? "positive" : "negative"}`}>
        <FontAwesomeIcon icon={isPositive ? "arrow-up" : "arrow-down"} className="icon" />
        <span>{Math.abs(change)} new this month</span>
      </div>
      </div>
  
  )
}

export default CustomerStats;