require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/persons");

// Set express
const app = express();

//Solve cross-origin resource sharing error
app.use(cors());

//create morgan token to display body request
app.use(express.json());
morgan.token("data", (req, res) => {
  return JSON.stringify(req.body);
});

// use morgan do log requests info
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      tokens.data(req, res),
      "-",
    ].join(" ");
  })
);

// use static folder from react build
app.use(express.static("build"));

// logget create manually
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// use logger
app.use(requestLogger);

// hardcoded data
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

// index route
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// api route
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// info route
app.get("/info", (req, res) => {
  date = new Date().toString();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>`);
});

// person by id route
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
// delete route
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  person = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

// create person route
app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 10000);
  const person = req.body;
  person.id = id;
  console.log(person, id);
  const found =
    persons.find((person) => req.body.name === person.name) !== undefined;
  console.log(found);
  if (!req.body.name || !req.body.number || found) {
    res
      .status(404)
      .json({ error: "name already exists or name, number not inserted" });
  } else {
    persons.concat(person);
    res.json(person);
  }
});

//handle request to unknown url
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server ruuning at port ${PORT}`);
});
