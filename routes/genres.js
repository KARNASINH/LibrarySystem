const express = require("express");
const router = express.Router();
const Genre = require("../models/genre");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

// GET handlers for /Genres/
router.get("/", isLoggedIn, (req, res, next) => {
  Genre.find((err, genres) => {
    if (err) {
      console.log(err);
    } else {
      res.render("genres/index", {
        title: "Available Genres",
        dataset: genres,
        user: req.user,
      });
    }
  }).sort({ name: 1 });
});

// GET handler for /Genres/Add
router.get("/add", isLoggedIn, (req, res, next) => {
  res.render("genres/add", { title: "Add a new Genre", user: req.user });
});

// POST handler for /Genres/Add
router.post("/add", isLoggedIn, (req, res, next) => {
  Genre.create(
    {
      name: req.body.name,
    },
    (err, newGenre) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/genres");
      }
    }
  );
});

module.exports = router;
