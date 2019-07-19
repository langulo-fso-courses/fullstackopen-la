import React from "react";

/**
 * Form for contacts
 */
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

export default NumberForm;
