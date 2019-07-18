import React from 'react';
import CountryDetail from './CountryDetail';
import CountryShort from './CountryShort';

// The display for the results of the search
const CountryDisplay = ({
    countries,
    searchedCountry,
    selectedCountry,
    setSelectedC
  }) => {
    // Selected country is only relevant for the display component, hence that bit of state is here
  
    const filter = country =>
      country.name.toLowerCase().includes(searchedCountry.toLowerCase());
    const matches = countries.filter(filter);
  
    let elements = null;
  
    // Checks for how many results you have. Ugly chain of ifs, ewwww
    if (matches.length > 10) {
      elements = <p>Too many matches, specify another filter</p>;
    } else if (matches.length < 1) {
      elements = <p>No countries found, try changing your search terms</p>;
    } else if (selectedCountry || matches.length === 1) {
      elements = <CountryDetail country={matches[0]} />;
    } else {
      elements = matches.map(country => (
        <CountryShort
          country={country}
          key={country.numericCode}
          setSelectedC={setSelectedC}
        />
      ));
    }
    return <div className="countries-display">{elements}</div>;
  };

export default CountryDisplay;
