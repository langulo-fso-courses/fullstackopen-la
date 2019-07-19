import React, { useState, useEffect } from "react";
import Axios from "axios";

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
    )
      .then(res => setWeather(res.data))
      .catch(res => console.log("weather request failed: ", res));
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

export default CountryDetail;
