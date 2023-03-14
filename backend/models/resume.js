const mongoose = require("mongoose");
const { Schema } = mongoose;

const resumeSchema = new Schema({
  name: { first: String, middle: String, last: String },
  about: String,
  position: String,
  experiences: [
    {
      company: String,
      position: String,
      timePeriod: String,
      responsibilities: String,
      skills: String,
      awards: String,
    },
  ],
  education: { degree: String, timePeriod: String, description: String },
  contact: { email: String, phone: String },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = { Resume };
