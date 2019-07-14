import React, { useState, useEffect } from "react";
import Axios from "axios";

// The country search component
const CountrySearch = ({ searchedCountry, setSearchedC }) => {
  const handler = event => setSearchedC(event.target.value);
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

// The display for the results of the search
const CountryDisplay = ({ countries, searchedCountry }) => {
  // Selected country is only relevant for the display component, hence that bit of state is here
  const [selectedCountry, setSelectedC] = useState(null);

  const filter = country =>
    country.name.toLowerCase().includes(searchedCountry.toLowerCase());
  const matches = countries.filter(filter);

  let elements = null;

  // Checks for how many results you have. Ugly chain of ifs, ewwww
  if (matches.length > 10) {
    elements = <p>Too many matches, specify another filter</p>;
  } else if (matches.length < 1) {
    elements = <p>No countries found, try changing your search terms</p>;
  } else if (matches.length === 1) {
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

const CountryShort = ({ country, setSelectedC }) => {
  return (
    <div className="country-short">
      <span><p>{country.name}</p> <button onClick={setSelectedC} >Show</button></span>
    </div>
  );
};

const CountryDetail = ({ country }) => {
  return (
    <div className="country-detail">
      <h1>{country.name}</h1>
      <span>
        <b>Capital: </b>
        {country.capital}
      </span>
      <br />
      <span>
        <b>Population: </b>
        {country.population}
      </span>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => (
          <li>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" width="480" length="640" />
    </div>
  );
};

function App() {
  // TODO: DON'T use the namesearch in the API, it might trigger too many requests too fast and you'll get blacklisted for awhile

  // State
  const [searchedCountry, setSearchedC] = useState("");
  const [countries, setCountries] = useState([]);

  // Request the whole list of countries from the endpoint and save it as state

  useEffect(() => {
    Axios.get("https://restcountries.eu/rest/v2/all").then(res =>
      setCountries(res.data)
    );
  }, []);

  return (
    <div className="App">
      <CountrySearch
        searchedCountry={searchedCountry}
        setSearchedC={setSearchedC}
      />
      <CountryDisplay countries={countries} searchedCountry={searchedCountry} />
    </div>
  );
}

export default App;
