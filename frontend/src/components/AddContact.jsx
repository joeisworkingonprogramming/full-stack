import { useState } from "react";

const AddContact = ({ handleAddClick }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const resetCallback = () => {
    setName("");
    setNumber("");
  };
  return (
    <>
      <h2>Add Contact</h2>
      <p>
        <span>Name: </span>
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </p>
      <p>
        <span>Number: </span>
        <input
          type="text"
          value={number}
          onChange={(event) => {
            setNumber(event.target.value);
          }}
        />
      </p>
      <button
        onClick={handleAddClick({ name: name, number: number }, resetCallback)}
      >
        Add
      </button>
    </>
  );
};

export default AddContact;
