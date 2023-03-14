import React from "react";

const ResumeEducation = ({ education }) => {
  return (
    <div className="education-section">
      <h2 className="body-title">education</h2>
      <div className="spacer"></div>
      <div className="show-text">
        <p className="highlight-description">
          {education && education.description}
        </p>
        <span className="highlight-text">
          {education && education.degree}
          <span className="time-period">
            {education && education.timePeriod}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ResumeEducation;
