import React from "react";

// The display for the results of the search
const ResultDisplay = ({ countries, setActiveCountry }) => {
  const activeCountryHandler = (country) => () => setActiveCountry(country)
  
  const results = countries.map(country => {
    return (
      <div className="country-short" key={country.numericCode}>
        <span >
          <p>{country.name}</p> <button onClick={activeCountryHandler(country)}>Show</button>
        </span>
      </div>
    );
  });
  return <div className="countries-display">{results}</div>;
};

export default ResultDisplay;
