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
      .then((res) => res.data)
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
          setContacts([...contacts, response.data]);
          displayMessage("success", "contact added");
          resetCallback();
        })
        .catch(() => displayMessage("error", "failed to add new contact"));
    };
  };

  const handleDelete = (contact) => {
    return () => {
      axios
        .delete(`/api/persons/${contact.id}`)
        .then(() => {
          setContacts(contacts.filter((c) => c.id !== contact.id));
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
