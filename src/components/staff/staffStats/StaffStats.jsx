import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../styles/statsCard.css';
import { useStaffs } from '../../../hooks/useStaff';

const StaffStats = () => {
    //Fetch all staffs
    const {staffs}= useStaffs();
    const totalStaffs = staffs.length;

      // Example: new Staffs this month
  const now = new Date();
  const newThisMonth = staffs.filter(c => {
    const created = new Date(c.createdAt); 
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;


    const isPositive= newThisMonth>=0;
    const change = newThisMonth;

  return (
  
     <div className={`stat-card staff`}>
   <h3>Total Staffs</h3>
   <div className="value">{totalStaffs}</div>
      <div className={`change ${isPositive ? "positive" : "negative"}`}>
        <FontAwesomeIcon icon={isPositive ? "arrow-up" : "arrow-down"} className="icon" />
        <span>{Math.abs(change)} new this month</span>
      </div>
      </div>
  
  )
}

export default StaffStats;