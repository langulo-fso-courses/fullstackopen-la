import React, { useState, useEffect } from "react";
import Axios from "axios";

// The search form
const Search = ({ newSSHandler, filterString }) => {
  return (
    <div className="search">
      <p>filter shown with: </p>
      <input type="text" onChange={newSSHandler} value={filterString} />
    </div>
  );
};

// The input form component
const NumberForm = ({
  newNameHandler,
  newNumberHandler,
  submitHandler,
  newName,
  newNumber
}) => {
  // form needs onSubmit, input needs onChange
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input type="text" onChange={newNameHandler} value={newName} />
      </div>
      <div>
        Number: <input type="text" onChange={newNumberHandler} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// The phonebook display component
const PersonsDisplay = ({ persons, filterString }) => {
  // The search filter
  const filter = person =>
    person.name.toLowerCase().includes(filterString) ||
    filterString.length === 0;

  const personElements = persons.filter(filter).map(person => (
    <div>
      {person.name} {person.number}
    </div>
  ));
  return (
    <div>
      <h2>Numbers</h2>
      {personElements}
    </div>
  );
};

// The "main" app
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(""); // state of newname input
  const [newNumber, setNewNumber] = useState(""); // state of newnumber input
  const [filterString, setNewFS] = useState(""); // the search filter string

  // Axios call to server for the phonebook
  useEffect(()=>{
    console.log("useEffect for phonebook");
    Axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  // The handler functions for field changes (introducing a new person to the book, new number, searchstring, etc)
  const newNameHandler = event => setNewName(event.target.value);
  const newNumberHandler = event => setNewNumber(event.target.value);
  const newSFHandler = event => setNewFS(event.target.value.toLowerCase());

  const submitHandler = event => {
    // Add the new person to the array, remember make a new one don't mutate the original
    event.preventDefault();

    for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber
      })
    );
    setNewName("");
    setNewNumber("");
  };

  // App controls the rest of the form components and keeps track of the state
  return (
    <>
      <h2>Phonebook</h2>
      <Search newSSHandler={newSFHandler} />
      <h2> Add new </h2>
      <NumberForm
        newNameHandler={newNameHandler}
        newNumberHandler={newNumberHandler}
        submitHandler={submitHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h1>Numbers </h1>
      <PersonsDisplay persons={persons} filterString={filterString} />
    </>
  );
};

export default App;
