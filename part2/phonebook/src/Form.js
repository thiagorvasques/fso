import React from "react";

function Form(props) {
  return (
    <form onSubmit={(e) => props.handleNewPerson(e)}>
      <h2>Add New</h2>
      <div>
        name:
        <input
          type="text"
          value={props.newName}
          onChange={(e) => props.handleNewName(e)}
          required
        />
      </div>
      <div>
        number:
        <input
          type="text"
          value={props.newNumber}
          onChange={(e) => props.handleNewNumber(e)}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default Form;
