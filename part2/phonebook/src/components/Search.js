import React from "react";

// The search form
const Search = ({ newSSHandler, filterString }) => {
  return (
    <div className="search">
      <p>filter shown with: </p>
      <input type="text" onChange={newSSHandler} value={filterString} />
    </div>
  );
};

export default Search;
