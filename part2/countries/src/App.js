import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const CountrySearch = ({searchedCountry, setSearchedC}) => {
  console.log("country search")
  return(
    <div className="country-search">
      <input type="text" value={searchedCountry} onChange={setSearchedC} />
    </div>
  )
}

function App() {
  // State
  const [searchedCountry, setSearchedC] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedC] = useState(0);

  // Request effect
  const apiHookAll = ()=>{
    Axios.get('https://restcountries.eu/rest/v2/all')
    .then((res) => {
      console.log(res.data)
      setCountries(res.data)
    })
  }

  useEffect(apiHookAll, [])

  return (
    <div className="App">
      <CountrySearch  />
      <div></div>
    </div>
  );
}

export default App;
