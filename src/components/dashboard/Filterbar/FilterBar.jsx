import React from "react";
import "./filterBar.css";

const FilterBar = () => {
  return (
   <div className="filter-bar">
  <div className="filter-group selects">
    <select className="filter-control">
      <option value="all">All Categories</option>
      <option value="accessories">Accessories</option>
      <option value="computer">Computer</option>
      <option value="mobile">Mobile</option>
      <option value="office-supplies">Office Supplies</option>
    </select>

    <select className="filter-control">
      <option value="all">All Status</option>
      <option value="in-stock">In Stock</option>
      <option value="low-stock">Low Stock</option>
      <option value="out-of-stock">Out of Stock</option>
    </select>
  </div>

  <div className="filter-group search">
    <input
      type="text"
      className="filter-control"
      placeholder="Search by SKU or name..."
    />
  </div>
</div>

  );
};

export default FilterBar;
