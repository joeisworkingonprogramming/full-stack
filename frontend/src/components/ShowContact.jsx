import React from "react";

const ShowContact = ({ searchKey, contents, handleDelete }) => {
  const filter = searchKey ? searchKey.toLowerCase() : "";
  return (
    <>
      <h2>Contacts</h2>
      {contents
        .filter((contact) => {
          return contact.name.toLowerCase().includes(filter);
        })
        .map((contact) => {
          return (
            <div key={contact.id}>
              <span>{contact.name} </span>
              <span>{contact.number}</span>
              <button onClick={handleDelete(contact)}>delete</button>
            </div>
          );
        })}
    </>
  );
};

export default ShowContact;
