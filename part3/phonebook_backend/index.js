const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  date = new Date().toString();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  person = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server ruuning at port ${PORT}`);
});