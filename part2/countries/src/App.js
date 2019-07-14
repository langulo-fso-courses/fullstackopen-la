import React, { useState, useEffect } from "react";
import Axios from "axios";

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
  const filter = country =>
    country.name.toLowerCase().includes(searchedCountry);
  const matches = countries.filter(filter);

  let elements = null;
  if (matches.length > 10) {
    elements = <p>Too many matches, specify another filter</p>;
  } else if (matches.length < 1) {
    elements = <p>No countries found, try changing your search terms</p>;
  } else {
    elements = matches.map(country => <CountryShort country={country} key={country.alpha3Code} />);
  }
  return <div className="countries-display">{elements}</div>;
};

const CountryShort = ({ country }) => {
  return <p>{country.name}</p>;
};

function App() {
  // TODO: DON'T use the namesearch in the API, it might trigger too many requests too fast and you'll get blacklisted for awhile

  // State
  const [searchedCountry, setSearchedC] = useState("");
  const [countries, setCountries] = useState([]);
  // const [selectedCountry, setSelectedC] = useState(0);

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
