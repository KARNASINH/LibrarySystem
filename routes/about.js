const express = require("express");
// create router object
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("about", { title: "Vision, Mission & Values" });
});

// export router object
module.exports = router;
