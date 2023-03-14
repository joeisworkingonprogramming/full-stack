import React from "react";

const ResumeExperience = ({ experiences }) => {
  return (
    <>
      <h2 className="body-title">experience</h2>
      <div className="spacer"></div>
      {experiences &&
        experiences.map((experience) => {
          return (
            <div className="each-experience show-text">
              <div className="highlight-description">{experience.company}</div>
              <span className="highlight-text">
                {experience.position}
                <span className="time-period">{experience.timePeriod}</span>
              </span>

              <p>
                <strong>Responsibilities:</strong> {experience.responsibilities}
              </p>
              <p>
                <strong>Skills:</strong> {experience.skills}
              </p>
              {experience.awards && (
                <p>
                  <strong>Awards:</strong> {experience.awards}
                </p>
              )}
            </div>
          );
        })}
    </>
  );
};

export default ResumeExperience;
