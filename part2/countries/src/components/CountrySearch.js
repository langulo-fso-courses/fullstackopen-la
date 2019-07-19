import React from "react";

// The country search component
const CountrySearch = ({
  countryFilter,
  setCountryFilter,
  setActiveCountry
}) => {
  // Code smell: This seems like it breaks separation of concerns, but it works as requested
  const handler = event => {
    setCountryFilter(event.target.value);
    setActiveCountry(null);
  };

  return (
    <div className="country-search">
      <span>
        <label htmlFor="searched">Find countries: </label>
        <input
          name="searched"
          type="text"
          value={countryFilter}
          onChange={handler}
        />
      </span>
    </div>
  );
};

export default CountrySearch;
