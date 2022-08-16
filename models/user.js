/**
 * Auhor: Karnasinh Gohil
 */

//Imported mongoose module.
const mongoose = require("mongoose");

//Importing module.
const plm = require("passport-local-mongoose");

//Created schema definition using mapping notation.
const schemaDefination = {
  userName: { type: String },
  password: { type: String },
  outhId: { type: String },
  outhProvider: { type: String },
  created: { type: String },
};

//Creating a mongoose schema using the definition object.
const mongooseSchema = new mongoose.Schema(schemaDefination);

//Using plugin method with schema to expand shcema object's functionality.
mongooseSchema.plugin(plm);

//Creating a mongoose model using the mongoose schema.
const mongooseModel = new mongoose.model("User", mongooseSchema);

//Exporting module.
module.exports = mongooseModel;
