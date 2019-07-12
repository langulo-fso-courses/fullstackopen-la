import React, { useState } from "react";

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
const PhoneForm = ({
  newNameHandler,
  newPhoneHandler,
  submitHandler,
  newName,
  newPhone
}) => {
  // form needs onSubmit, input needs onChange
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input type="text" onChange={newNameHandler} value={newName} />
      </div>
      <div>
        phone: <input type="text" onChange={newPhoneHandler} value={newPhone} />
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
      {person.name} {person.phone}
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState(""); // state of newname input
  const [newPhone, setNewPhone] = useState(""); // state of newphone input
  const [filterString, setNewFS] = useState(""); // the search filter string

  // The handler functions for field changes (introducing a new person to the book, new phone, searchstring, etc)
  const newNameHandler = event => setNewName(event.target.value);
  const newPhoneHandler = event => setNewPhone(event.target.value);
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
        phone: newPhone
      })
    );
    setNewName("");
    setNewPhone("");
  };

  // App controls the rest of the form components and keeps track of the state
  return (
    <>
      <h2>Phonebook</h2>
      <Search newSSHandler={newSFHandler} />
      <h2> Add new </h2>
      <PhoneForm
        newNameHandler={newNameHandler}
        newPhoneHandler={newPhoneHandler}
        submitHandler={submitHandler}
        newName={newName}
        newPhone={newPhone}
      />
      <h1>Numbers </h1>
      <PersonsDisplay persons={persons} filterString={filterString} />
    </>
  );
};

export default App;
