// naming convention > models are singular, routers are plural
// model is an object that represents my data and interacts with the db

// Import mongoose
const mongoose = require("mongoose");
// Create schema definition using mapping notation
// Define what you want your data to look like
const booksSchemaDefinition = {
  name: {
    type: String, // data type string
    required: true,
  },
  author: {
    type: String, // data type string
    required: true,
  },
  language: {
    type: String, // data type string
    required: true,
  },
  publishedDate: {
    type: Date, // data type date
  },
  arrivedDate: {
    type: Date, // data type date
  },
  genre: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    //required: true,
  },
  status: {
    type: String,
    default: "Available", // all projects added to my db will be in TO DO
  },
};
// Create a mongoose schema using the definition object
const booksSchema = new mongoose.Schema(booksSchemaDefinition);
// Create a mongoose model using the mongoose schema
module.exports = mongoose.model("Book", booksSchema);
