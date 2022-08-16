/*
 * Auhor: Karnasinh Gohil
 */

//Imported express module.
const express = require("express");

//Created router object.
const router = express.Router();

//Get handler to render about page.
router.get("/", (req, res, next) => {
  res.render("contact", { title: "Contact the library" });
});

//Exported router object.
module.exports = router;
