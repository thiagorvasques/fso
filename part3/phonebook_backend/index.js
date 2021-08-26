const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// atlas db url
const password = "10desetembrode1983";
const url = `mongodb+srv://thiagovasques:${password}@phonebook-app.xxk80.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

// mongoose connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Set new Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Set new model
const Person = mongoose.model("Person", personSchema);

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
  db.once("open", function () {
    console.log("onnected");
    Person.find(function (err, result) {
      if (err) return console.log(err);
      res.send(result);
    });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ruuning at port ${PORT}`);
});
