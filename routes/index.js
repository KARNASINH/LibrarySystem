/*
 * Auhor: Karnasinh Gohil
 */

//Imported express module.
var express = require("express");
//Imported roter object.
var router = express.Router();

//Imported user module.
const User = require("../models/user");
//Imported passport module.
const passport = require("passport");

/*Defining different routers*/

//Defined home page router.
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

//GET handler for /login
router.get("/login", (req, res, next) => {
  //Extract messages from session or create an empty list if these don't exist
  let messages = req.session.messages || [];
  //Clear messages
  req.session.messages = [];
  //Pass messages to the view
  res.render("login", { title: "Login to your Account", messages: messages });
});

//POST handler for /login
//Use passport out of the box middleware to authenticate user.
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/login",
    failureMessage: "Invalid Credentials",
  })
);

// GET handler for /register
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Sign up for an Account" });
});

// POST handler for /register
router.post("/register", (req, res, next) => {
  // Create a new user based on the info sent
  User.register(
    new User({
      username: req.body.username,
    }), //New user object with info from the request
    req.body.password, //Password (so that it can be encrypted)
    (err, newUser) => {
      //Callback function to handle success/fail
      if (err) {
        //If there's an error we'll send the user back to register
        console.log(err);
        res.redirect("/register");
      } else {
        //Else log the user in and redirect to /books
        req.login(newUser, (err) => {
          res.redirect("/books");
        });
      }
    }
  );
});

//Logout handler, it will logout as user clicks on the logout page and redirect to login page again.
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

//Get handler for "/github"
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user.email"] })
);

//Get handler for /github/callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }), //If user failed to authenticate then it will redirect to the login page.
  (req, res, next) => {
    res.redirect("/books"); //If user authenticate successfully then takes user on the
  }
);
//Exporting router object.
module.exports = router;
