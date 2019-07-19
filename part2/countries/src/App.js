import React, { useState, useEffect } from "react";
import CountryAPI from "./api/CountryAPI";
import CountrySearch from "./components/CountrySearch";
import ResultDisplay from "./components/ResultDisplay";
import CountryDetail from "./components/CountryDetail";

/**
 * Filters an array of countries by name, comparing the countries name attribute and retuning an array containing any partial matches found
 */
const filterCountries = (countries, filterString) => {
  const result = countries.filter(country =>
    country.name.toLowerCase().includes(filterString.toLowerCase())
  );
  return result;
};

function App() {
  const [countryFilter, setCountryFilter] = useState(""); // The country filtered
  const [allCountries, setAllCountries] = useState([]); // The list of countries from the API
  const [activeCountry, setActiveCountry] = useState(null); // The currently selected country
  let elements = null;

  // Request the whole list of countries from the endpoint and save it as state
  useEffect(() => {
    CountryAPI.getAll().then(data => setAllCountries(data));
  }, []);

  const matches = filterCountries(allCountries, countryFilter);
  // 2. Logic to select what to render here
  // TODO: Chains of ifs are a code smell
  // TODO: Check to see if I could replace it with a switch
  if (activeCountry) {
    elements = <CountryDetail country={activeCountry} />;
  } else if (matches.length > 10) {
    elements = <p>Too many matches, specify another filter</p>;
  } else if (matches.length < 1) {
    elements = <p>No countries found, try changing your search terms</p>;
  } else if (matches.length === 1) {
    elements = <CountryDetail country={matches[0]} />;
  } else {
    elements = (
      <ResultDisplay countries={matches} setActiveCountry={setActiveCountry} />
    );
  }

  // Render the app
  return (
    <div className="App">
      <CountrySearch
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        setActiveCountry={setActiveCountry}
      />
      {elements}
    </div>
  );
}

export default App;
