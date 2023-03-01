require("./config/config");

const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./db");
// const cors = require("cors");

db.connect(app);

// middleware start
app.use(express.json());
app.use(express.static("public"));
// app.use(cors());
morgan.token("body", function (req, res) {
  const body = req.body;
  return Object.keys(body).length !== 0 ? JSON.stringify(req.body) : " ";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// adding routes
require("./routes")(app);

// server listening
const PORT = process.env.PORT || 8081;
app.on("ready", () => {
  app.listen(PORT, () => {
    console.log("Server is up on port", PORT);
  });
});
