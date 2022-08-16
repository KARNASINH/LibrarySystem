/*
 * Auhor: Karnasinh Gohil
 */

//Imported express module.
const express = require("express");

//Created router object.
const router = express.Router();

//Imported different modules.
const Book = require("../models/book");
const Genre = require("../models/genre");

//This function check weather user has been logged in or not.
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

//Configuring different routes.

//Get router which routes to book index page.
router.get("/", (req, res, next) => {
  Book.find((err, books) => {
    if (err) {
      console.log(err);
    } else {
      res.render("books/index", {
        title: "Available Books",
        dataset: books,
        user: req.user,
      });
    }
  });
});

//Adding a book.
// GET handler to get add book page
router.get("/add", isLoggedIn, (req, res, next) => {
  Genre.find((err, genres) => {
    if (err) {
      console.log(err);
    } else {
      res.render("books/add", {
        title: "Add a new Book",
        genres: genres,
        user: req.user,
      });
    }
  }).sort({ name: 1 });
});

//Post handler to pass all book data into database.
router.post("/add", isLoggedIn, (req, res, next) => {
  Book.create(
    {
      //Parsing different data into database
      name: req.body.name,
      author: req.body.author,
      language: req.body.language,
      arrivedDate: req.body.arrivedDate,
      publishedDate: req.body.publishedDate,
      genre: req.body.genre,
      about: req.body.about,
    },
    (err, newBook) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/books");
      }
    }
  );
});

// GET handler for /Books/Delete/_id
router.get("/delete/:_id", isLoggedIn, (req, res, next) => {
  Book.remove(
    {
      _id: req.params._id,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/books");
      }
    }
  );
});

// GET handler for /Books/Edit/_id
router.get("/edit/:_id", isLoggedIn, (req, res, next) => {
  Book.findById(req.params._id, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      Genre.find((err, genres) => {
        if (err) {
          console.log(err);
        } else {
          res.render("books/edit", {
            title: "Edit a Book",
            book: book,
            genres: genres,
            user: req.user,
          });
        }
      }).sort({ name: 1 });
    }
  });
});

// POST handler for /Books/Edit/:_id
router.post("/edit/:_id", isLoggedIn, (req, res, next) => {
  Book.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      name: req.body.name,
      author: req.body.author,
      language: req.body.language,
      publishedDate: req.body.publishedDate,
      arrivedDate: req.body.arrivedDate,
      genre: req.body.genre,
      about: req.body.about,
      status: req.body.status,
    },
    (err, updatedBook) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/books");
      }
    }
  );
});

//Exported router object.
module.exports = router;
