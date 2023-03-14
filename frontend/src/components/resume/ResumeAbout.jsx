import React from "react";

const ResumeAbout = ({ about }) => {
  return (
    <div className="about-section">
      <h2 className="body-title">about me</h2>
      <div className="spacer"></div>
      <div className="show-text">{about}</div>
    </div>
  );
};

export default ResumeAbout;
