const mongoose = require("mongoose");

// atlas db url
const password = "10desetembrode1983";
//const url = `mongodb+srv://thiagovasques:${password}@phonebook-app.xxk80.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

// mongoose connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Set new Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
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
