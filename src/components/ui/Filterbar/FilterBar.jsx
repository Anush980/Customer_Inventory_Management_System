import React from "react";
import "./filterBar.css";

const FilterBar = ({ filters = [], search }) => {
  return (
    <div className="filter-bar">
      {/* Dropdown filters */}
      <div className="filter-group selects">
        {filters.map((filter, index) => (
          <select
            key={index}
            className="filter-control"
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Search input */}
      {search && (
        <div className="filter-group search">
          <input
            type="text"
            className="filter-control"
            value={search.value || ""}
            onChange={(e) => search.onChange(e.target.value)}
            placeholder={search.placeholder || "Search..."}
          />
        </div>
      )}
    </div>
  );
};

export default FilterBar;
