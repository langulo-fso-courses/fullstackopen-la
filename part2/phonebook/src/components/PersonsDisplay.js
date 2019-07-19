import React from "react";

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

export default PersonsDisplay;
