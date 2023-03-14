import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const ResumeHead = ({ position, name, contact }) => {
  return (
    <div className="resume-header">
      <h2 className="position">{position}</h2>
      <h1 className="name">
        {name && name.first} {name && name.last}
      </h1>
      <div className="info-flex">
        <div className="email">
          <span className="icon-class">
            <FaEnvelope />
          </span>
          <span className="email-text">{contact && contact.email}</span>
        </div>
        <div className="phone">
          <FaPhone />
          <span className="phone-text">{contact && contact.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeHead;
