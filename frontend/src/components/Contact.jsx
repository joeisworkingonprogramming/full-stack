import { useState, useEffect } from "react";
import axios from "axios";
import ShowContact from "./ShowContact";
import Notification from "./Notification";
import AddContact from "./AddContact";
import Filter from "./Filter";

const Contact = () => {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState({
    type: "success",
    content: "",
  });
  useEffect(() => {
    axios
      .get("/api/persons")
      .then((res) => res.data.data)
      .then((data) => setContacts(data))
      .catch(() => displayMessage("error", "failed to get persons"));
  }, []);
  const displayMessage = (type, content) => {
    setMessage({ type, content });
    setTimeout(() => {
      setMessage({ type: "success", content: "" });
    }, 3000);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleAddClick = (contact, resetCallback) => {
    return () => {
      axios
        .post("/api/persons", {
          name: contact.name,
          number: contact.number,
        })
        .then((response) => {
          const newContact = response.data.data;
          setContacts([...contacts, newContact]);
          displayMessage(
            "success",
            `Success to add contact: ${newContact.name}`
          );
          resetCallback();
        })
        .catch((err) => {
          // debugger;
          displayMessage(
            "error",
            `Failed to add new contact with error message: ${err.response.data.message}`
          );
        });
    };
  };
  const handleDelete = (contact) => {
    return () => {
      axios
        .delete(`/api/persons/${contact._id}`)
        .then(() => {
          setContacts(contacts.filter((c) => c._id !== contact._id));
          displayMessage("success", "contact deleted");
        })
        .catch(() => displayMessage("error", "failed to delete contact"));
    };
  };

  return (
    <>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <AddContact handleAddClick={handleAddClick} />
      <ShowContact
        searchKey={filter}
        contents={contacts}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Contact;
