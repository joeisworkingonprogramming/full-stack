const person = require("./person.js");
const resume = require("./resume.js");

const routes = (app) => {
  app.use("/api", person);
  app.use("/api", resume);
};

module.exports = routes;
