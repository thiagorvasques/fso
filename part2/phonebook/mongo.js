const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://thiagovasques:${password}@phonebook-app.xxk80.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

//mongoose.set("useFindAndModify", false);
//mongoose.set("useCreateIndex", true);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  const Person = mongoose.model("Person", personSchema);

  //   const person = new Person({
  //     name: process.argv[3],
  //     number: process.argv[4],
  //   });

  //   person.save().then((result) => {
  //     console.log("person saved");
  //   });

  Person.find(function (err, persons) {
    if (err) return console.error(err);
    persons.forEach((person) => console.log(person.name, person.number));
    return mongoose.connection.close();
  });
});
