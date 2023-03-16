import React from "react";
import { FaEnvelope, FaPhone, FaReadme } from "react-icons/fa";

const ResumeHead = ({ position, name, contact }) => {
  return (
    <div className="resume-header">
      <h2 className="position">{position}</h2>
      <h1 className="name">
        {name && name.first} {name && name.last}
      </h1>
      <div className="info-flex">
        <div className="contact-item">
          <FaEnvelope />
          <span className="contact-text">{contact && contact.email}</span>
        </div>
        <div className="contact-item">
          <FaPhone />
          <span className="contact-text">{contact && contact.phone}</span>
        </div>
        <div className="contact-item">
          <FaReadme />
          <span className="contact-text">{contact && contact.web}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeHead;
