import React from 'react';

// The short form of a country on-screen used in the multiple results display
const CountryShort = ({ country, setSelectedC }) => {
    return (
      <div className="country-short">
        <span>
          <p>{country.name}</p> <button onClick={setSelectedC}>Show</button>
        </span>
      </div>
    );
  };

export default CountryShort;
