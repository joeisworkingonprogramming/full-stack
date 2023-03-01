const person = require("./person.js");

const routes = (app) => {
  app.use("/api", person);
};

module.exports = routes;
