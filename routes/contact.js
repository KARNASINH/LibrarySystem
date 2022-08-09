const express = require("express");
// create router object
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("contact", { title: "Contact the library" });
});

// export router object
module.exports = router;
