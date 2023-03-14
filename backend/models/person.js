const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

module.exports = { Person };
