/**
 * Auhor: Karnasinh Gohil
 */

//Imported mongoose module.
const mongoose = require("mongoose");

//Created schema definition using mapping notation.
const booksSchemaDefinition = {
  name: {
    type: String, //String datatype.
    required: true, //It says, this data is must.
  },
  author: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date, //Date datatype.
  },
  arrivedDate: {
    type: Date,
  },
  genre: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Available", //Default value for this field is "Available".
  },
};

//Creating a mongoose schema using the definition object.
const booksSchema = new mongoose.Schema(booksSchemaDefinition);

//Creating a mongoose model using the mongoose schema and exporting it.
module.exports = mongoose.model("Book", booksSchema);
