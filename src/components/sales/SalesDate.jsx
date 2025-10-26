import React from "react";
import "./salesDate.css";
import NepaliDate from "nepali-datetime";

const SalesDate = () => {
  return (
    <div className="sales-date">
      <div className="date-card">
        <h3>Sun</h3>
        <p>Bhaisakh </p>
      </div>
      <div className="date-card">
        <h3>Mon</h3>
        <p>Bhaisakh</p>
      </div>
      <div className="date-card">
        <h3>Tues</h3>
        <p>Ashad </p>
      </div>
      <div className="date-card active">
        <h3>Wed</h3>
        <p>Shrawan 2</p>
      </div>
      <div className="date-card">
        <h3>Thu</h3>
        <p>Shrawan 2</p>
      </div>
      <div className="date-card">
        <h3>Fri</h3>
        <p>Ashad 2</p>
      </div>
      <div className="date-card">
        <h3>Sat</h3>
        <p>Bhadra </p>
      </div>
    </div>
  );
};

export default SalesDate;
