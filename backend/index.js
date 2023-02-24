const express = require("express");
const app = express();
const morgan = require("morgan");
// const cors = require("cors");

// middleware start
app.use(express.json());
app.use(express.static("build"));
// app.use(cors());
morgan.token("body", function (req, res) {
  const body = req.body;
  return Object.keys(body).length !== 0 ? JSON.stringify(req.body) : " ";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// func
const getMaxId = () => {
  let maxId = 0;
  persons.forEach((person) => {
    if (person.id > maxId) {
      maxId = person.id;
    }
  });
  return maxId;
};

//routes

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: "no name provided",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "no number provided",
    });
  }
  const person = {
    id: getMaxId() + 1,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "invalid name or number",
    });
  }
  let person = persons.find((person) => person.id === id);
  if (!person) {
    return res.status(404).json({
      error: `person with id ${id} not existed`,
    });
  }
  person.name = body.name;
  person.number = body.number;
  return res.json({
    id,
    name: person.name,
    number: person.number,
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  return res.status(204).end();
});
//server listening
const PORT = process.env.PORT || 8081;
app.listen(PORT);
console.log("server is running with port", PORT);
