import React, { useState, useEffect } from "react";
import PersonsAPI from "./requests/PersonsAPI";

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
  return (
    <form onSubmit={submitHandler}>
      <div>
        Name: <input type="text" onChange={newNameHandler} value={newName} />
      </div>
      <div>
        Number:{" "}
        <input type="text" onChange={newNumberHandler} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// The phonebook display component
const PersonsDisplay = ({ persons, filterString, deleteHandler }) => {
  // The search filter
  const filter = person =>
    person.name.toLowerCase().includes(filterString) ||
    filterString.length === 0;

  const personElements = persons.filter(filter).map(person => (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={deleteHandler(person.id)}>Delete</button>
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

  // API call for the phonebook
  useEffect(() => {
    PersonsAPI.getAll().then(personData => setPersons(personData));
  }, []);

  // The handler functions for field changes (introducing a new person to the book, new number, searchstring, etc)
  const newNameHandler = event => setNewName(event.target.value);
  const newNumberHandler = event => setNewNumber(event.target.value);
  const newSFHandler = event => setNewFS(event.target.value.toLowerCase());
  // handler for the contact form
  const replaceNumber = newPerson => {
    // Code smell - seems inefficient, but the alternative involved mutating state, what do?
    let updatedPerson = {}

    const newPersons = persons.map(person => {
      if (person.name === newPerson.name){
        person.number = newPerson.number
        updatedPerson = person
      }
      return person
    })
    // API call
    PersonsAPI.update(updatedPerson.id, updatedPerson)
    .then(setPersons(newPersons))
  }
  const submitHandler = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    let replace = false;
    for (const person of persons) {
      if (person.name === newPerson.name) {
        replace = window.confirm(`${newName} is already added to phonebook. Replace previous phone number?`);
        if (replace) {
          replaceNumber(newPerson)
        }
      }
    }
    if (!replace){
      // Add the new contact to the existing state - to the server
      PersonsAPI.create(newPerson).then(person => {
      setPersons(persons.concat(person));  // Update the local persons state
      setNewName("");
      setNewNumber("");
    });
    }
  };

  // This handles the del button, so it has to curry or trigger constant reloads
  const deleteHandler = id => () => {
    const newPersonList = persons.filter((person) => person.id !== id)
    PersonsAPI.destroy(id)
    .then(setPersons(newPersonList))
  }

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
      <PersonsDisplay persons={persons} filterString={filterString} deleteHandler={deleteHandler} />
    </>
  );
};

export default App;
