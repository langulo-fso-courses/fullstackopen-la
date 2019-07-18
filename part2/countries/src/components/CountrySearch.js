import React from 'react';

// The country search component
const CountrySearch = ({ searchedCountry, setSearchedC, setSelectedC }) => {
  const handler = event => {
    setSearchedC(event.target.value);
    setSelectedC(null);
  };
  return (
    <div className="country-search">
      <span>
        <label htmlFor="searched">Find countries: </label>
        <input
          name="searched"
          type="text"
          value={searchedCountry}
          onChange={handler}
        />
      </span>
    </div>
  );
};

export default CountrySearch;
