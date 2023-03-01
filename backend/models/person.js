const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  number: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = { Person };
