import React, { useState, useEffect } from "react";
import PersonsAPI from "./requests/PersonsAPI";
import Search from "./components/Search";
import NumberForm from "./components/NumberForm";
import PersonsDisplay from "./components/PersonsDisplay";
import Notification from "./components/Notification";

/**
 * Helper function for notification logic.
 */
const messageHelper = (setMessage, messageObj) => {
  // It might be worth looking into custom hooks, I have a feeling they cover the "extract logic" usecase
  setMessage(messageObj);
  setTimeout(() => setMessage({ type: "", content: "" }), 3000);
};

// The "main" app
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(""); // state of newname input
  const [newNumber, setNewNumber] = useState(""); // state of newnumber input
  const [filterString, setNewFS] = useState(""); // the search filter string
  const [message, setMessage] = useState({ type: "", content: "" }); // the error/confirmation message

  // API call for the phonebook
  useEffect(() => {
    PersonsAPI.getAll()
      .then(personData => setPersons(personData)) // Try to get persons from the API
      .catch(() => {
        // If there's no lambda here, the error message shows even if the request is successful. No idea why
        messageHelper(setMessage, {
          type: "error",
          content: "API connection failed, cannot get contacts from server"
        });
      }); // If you can't, show an error dialogue
  }, []);

  // The handler functions for field changes (introducing a new person to the book, new number, searchstring, etc)
  const newNameHandler = event => setNewName(event.target.value);
  const newNumberHandler = event => setNewNumber(event.target.value);
  const newSFHandler = event => setNewFS(event.target.value.toLowerCase());

  const replaceNumber = newPerson => {
    // Code smell - seems inefficient, but the alternative involved mutating state, what do?
    let updatedPerson = {};

    const newPersons = persons.map(person => {
      if (person.name === newPerson.name) {
        person.number = newPerson.number;
        updatedPerson = person;
      }
      return person;
    });
    // API call
    PersonsAPI.update(updatedPerson.id, updatedPerson)
      .then(setPersons(newPersons))
      .then(
        messageHelper(setMessage, {
          type: "success",
          content: `updated ${updatedPerson.name}'s number to ${
            updatedPerson.number
          }`
        })
      );
  };

  // handler for the contact form
  const submitHandler = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    let replace = false;
    for (const person of persons) {
      if (person.name === newPerson.name) {
        replace = window.confirm(
          `${newName} is already added to phonebook. Replace previous phone number?`
        );
        if (replace) {
          replaceNumber(newPerson);
        }
      }
    }
    if (!replace) {
      // Add the new contact to the existing state - to the server
      PersonsAPI.create(newPerson).then(person => {
        setPersons(persons.concat(person)); // Update the local persons state
        setNewName("");
        setNewNumber("");
        messageHelper(setMessage, {
          type: "success",
          content: `Added ${newPerson.name} to records`
        });
      });
    }
  };

  // This handles the del button, so it has to curry or trigger constant reloads
  const deleteHandler = id => () => {
    const newPersonList = persons.filter(person => person.id !== id);
    PersonsAPI.destroy(id)
    .then(() => {
      setPersons(newPersonList);
      messageHelper(setMessage, {
        type: "success",
        content: `Record deleted`
      });
    })
    .catch(() => {
      setPersons(newPersonList);
      messageHelper(setMessage, {
        type: "error",
        content: `Record already deleted on the server. Updating local records...`
      });
    });
  };

  // App controls the rest of the form components and keeps track of the state
  return (
    <>
      <Notification type={message.type} content={message.content} />
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
      <PersonsDisplay
        persons={persons}
        filterString={filterString}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default App;
