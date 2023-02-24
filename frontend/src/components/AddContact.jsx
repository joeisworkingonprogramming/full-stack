import React from "react";

const AddContact = ({
  newContact,
  handleNameChange,
  handleNumberChange,
  handleAddClick,
}) => {
  return (
    <>
      <h2>Add Contact</h2>
      <p>
        <span>Name: </span>
        <input
          type="text"
          value={newContact.name}
          onChange={handleNameChange}
        />
      </p>
      <p>
        <span>Number: </span>
        <input
          type="text"
          value={newContact.number}
          onChange={handleNumberChange}
        />
      </p>
      <button onClick={handleAddClick}>Add</button>
    </>
  );
};

export default AddContact;
