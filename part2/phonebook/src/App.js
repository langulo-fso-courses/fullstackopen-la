import React, { useState } from "react";

// The input form component
const PhoneForm = ({ newNameHandler,  newPhoneHandler, submitHandler, newName, newPhone }) => {
  // form needs onSubmit, input needs onChange
  return (
    <form onSubmit={submitHandler}>
      <h2>Phonebook</h2>
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
const PersonsDisplay = ({ persons }) => {
  const personElements = persons.map(person => <div>{person.name} {person.phone}</div>);
  return (
    <div>
      <h2>Numbers</h2>
      {personElements}
    </div>
  );
};

// The "main" app
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phone: "040-1234567" }]);
  const [newName, setNewName] = useState(""); // state of newname input
  const [newPhone, setNewPhone] = useState(""); // state of newphone input

  // The handler function for name changes (introducing a new person to the book)
  const newNameHandler = event => setNewName(event.target.value);
  const newPhoneHandler = event => setNewPhone(event.target.value);

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
      <PhoneForm
        newNameHandler={newNameHandler}
        newPhoneHandler={newPhoneHandler}
        submitHandler={submitHandler}
        newName={newName}
        newPhone={newPhone}
      />
      <PersonsDisplay persons={persons} />
    </>
  );
};

export default App;
