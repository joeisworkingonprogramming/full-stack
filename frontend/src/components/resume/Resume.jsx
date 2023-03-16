import { useState, useEffect } from "react";
import Notification from "../Notification";
import axios from "axios";
import ShowResume from "./ShowResume";

const Resume = () => {
  const [resume, setResume] = useState({});
  const [message, setMessage] = useState({
    type: "success",
    content: "",
  });

  useEffect(() => {
    axios
      // dev env
      // .get("/api/resumes/640836af7d66c8b4ac8a386f")
      // prod env
      .get("/api/resumes/64102c873c9abff4bcf3a14c")
      .then((res) => res.data.data)
      .then((data) => setResume(data))
      .catch(() => displayMessage("error", "failed to get persons"));
  }, []);
  const displayMessage = (type, content) => {
    setMessage({ type, content });
    setTimeout(() => {
      setMessage({ type: "success", content: "" });
    }, 3000);
  };

  return (
    <div className="page-wrapper">
      <Notification message={message} />
      <ShowResume resume={resume} />
    </div>
  );
};

export default Resume;
