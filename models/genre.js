/**
 * Auhor: Karnasinh Gohil
 */

//Imported mongoose module.
const mongoose = require("mongoose");

//Created schema definition using mapping notation.
const schemaDefinition = {
  name: {
    type: String, //String Datatype.
    required: true, //It is must.
  },
};

//Creating a mongoose schema using the definition object.
const genresSchema = new mongoose.Schema(schemaDefinition);

//Creating a mongoose model using the mongoose schema and exporting it.
module.exports = mongoose.model("Genre", genresSchema);
