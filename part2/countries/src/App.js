import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CountrySearch from './components/CountrySearch';
import CountryDisplay from './components/CountryDisplay';


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
