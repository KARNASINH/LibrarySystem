const mongoose = require("mongoose");

//Q-- how do I handle encrypting/validation password?
//Q-- how do I handle serializing/deserializing this object to/from session store?
const plm = require("passport-local-mongoose");

const schemaDefination = {
  userName: { type: String },
  password: { type: String },
};

const mongooseSchema = new mongoose.Schema(schemaDefination);

//Q-- how to expand shcema object's functionality?
//ans-- use plugin method with schema.
mongooseSchema.plugin(plm);

const mongooseModel = new mongoose.model("User", mongooseSchema);

module.exports = mongooseModel;
