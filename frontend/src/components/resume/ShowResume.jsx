import React from "react";
import ResumeAbout from "./ResumeAbout";
import ResumeEducation from "./ResumeEducation";
import ResumeExperience from "./ResumeExperience";
import ResumeHead from "./ResumeHead";
import "./resume.css";

const ShowResume = ({ resume }) => {
  return (
    <div className="page">
      <div className="resume">
        <ResumeHead
          position={resume.position}
          name={resume.name}
          contact={resume.contact}
        />
        <div className="resume-body">
          <ResumeAbout about={resume.about} />
          <ResumeEducation education={resume.education} />
          <ResumeExperience experiences={resume.experiences} />
        </div>
      </div>
    </div>
  );
};

export default ShowResume;
