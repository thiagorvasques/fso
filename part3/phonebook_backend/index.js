require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/persons");

// Set express
const app = express();

//Solve cross-origin resource sharing error
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
//logger create manually
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// use logger
app.use(requestLogger);

//create morgan token to display body request
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

// api route
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// info route
app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.json(count);
    })
    .catch((error) => next(error));
});

// person by id route
app.get("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});
// delete route
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      //console.log(result);
      res.status(204).end();
    })
    .catch((error) => next(console.error()));
});

// create person route
app.post("/api/persons", (req, res) => {
  const body = req.body;
  //console.log(body, "body if request");
  if (body.name === undefined || body.number === undefined) {
    return res.status(404).json({ error: "Content missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    //console.log(savedPerson);
    res.json(savedPerson);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updated) => {
      res.json(updated);
    })
    .catch((error) => next(error));
});

//handle request to unknown url
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server ruuning at port ${PORT}`);
});
