import React from "react";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <p>
      <span>filter shown with </span>
      <input type="text" value={filter} onChange={handleFilterChange} />
    </p>
  );
};

export default Filter;
