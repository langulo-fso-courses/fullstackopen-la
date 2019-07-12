import React, { useState } from "react";

// The input form component
const PhoneForm = ({ newNameHandler, submitHandler, newName }) => {
  // form needs onSubmit, input needs onChange
  return (
    <form onSubmit={submitHandler}>
      <h2>Phonebook</h2>
      <div>
        name: <input type="text" onChange={newNameHandler} value={newName} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// The phonebook display component
const PersonsDisplay = ({ persons }) => {
  const personElements = persons.map(person => <div>{person.name}</div>);
  return (
    <div>
      <h2>Numbers</h2>
      {personElements}
    </div>
  );
};

// The "main" app
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState(""); // state of newname input

  // The handler function for name changes (introducing a new person to the book)
  const newNameHandler = event => setNewName(event.target.value);

  const submitHandler = event => {
    // Add the new person to the array, remember make a new one don't mutate the original
    event.preventDefault();
    console.log("submit handler: ", event);

    for (const person of persons) {
      if (person.name === newName) {
        alert("Person " + newName + " is already on the list");
        return;
      }
    }
    setPersons(
      persons.concat({
        name: newName
      })
    );
    setNewName("");
  };

  // App controls the rest of the form components and keeps track of the state
  return (
    <>
      <PhoneForm
        newNameHandler={newNameHandler}
        submitHandler={submitHandler}
        newName={newName}
      />
      <PersonsDisplay persons={persons} />
    </>
  );
};

export default App;
