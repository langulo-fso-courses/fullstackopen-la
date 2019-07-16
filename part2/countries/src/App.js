import React, { useState, useEffect } from "react";
import Axios from "axios";

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

const CountryShort = ({ country, setSelectedC }) => {
  return (
    <div className="country-short">
      <span>
        <p>{country.name}</p> <button onClick={setSelectedC}>Show</button>
      </span>
    </div>
  );
};

const CountryDetail = ({ country }) => {
  // Note: Something bothers me about having to hardcode an initial state for complex objects. Note sure if code smell.  
  const [weather, setWeather] = useState({
    current: {
      condition: {}
    }
  });

  // Set the state with an API call
  useEffect(() => {
    Axios.get(
      "http://api.apixu.com/v1/current.json?key=6a7f5b408af84601941232514191407&q=" +
        country.capital
    ).then(res => {
      setWeather(res.data);
      console.log(res);
    });
  }, [country.capital]);

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
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" width="480" length="640" />
      <div className="country-weather">
        <h3>Weather in {country.capital}</h3>
        <div className="weather-data">
          <span>
            <b>Temperature: </b> <p>{weather.current.temp_c}</p>
          </span>
          <span>
            <b>Wind: </b> <p>{weather.current.wind_kph}</p> <b>Direction: </b>{" "}
            {weather.current.wind_dir}{" "}
          </span>
        </div>
        <div className="weather-icon">
          <img
            src={weather.current.condition.icon}
            alt="Weather condition icon"
          />
        </div>
      </div>
    </div>
  );
};

function App() {
  // State
  const [searchedCountry, setSearchedC] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedC] = useState(null); // Finding out where this shoulda gone was PAINFUL

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
        setSelectedC={setSelectedC}
      />
      <CountryDisplay
        countries={countries}
        searchedCountry={searchedCountry}
        selectedCountry={selectedCountry}
        setSelectedC={setSelectedC}
      />
    </div>
  );
}

export default App;
