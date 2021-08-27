const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

// atlas db url
const password = "10desetembrode1983";
//const url = `mongodb+srv://thiagovasques:${password}@phonebook-app.xxk80.mongodb.net/phonebook-app?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI;
console.log("connected to", url);

// mongoose connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Set new Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    minlength: 3,
  },
  number: { type: String, minlength: 8 },
});

personSchema.plugin(uniqueValidator);
// set toJSON method to return id as string and remove __v
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// export new model
module.exports = mongoose.model("Person", personSchema);
