/*
 * Auhor: Karnasinh Gohil
 */

//Importing express module
const express = require("express");

//creating router object
const router = express.Router();

//Defining get request for the about page.
router.get("/", (req, res, next) => {
  res.render("about", { title: "Vision, Mission & Values" });
});

//Exported router funciton.
module.exports = router;
