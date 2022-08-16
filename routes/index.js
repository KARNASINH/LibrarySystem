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

//GET handler navigate to the login page
router.get("/login", (req, res, next) => {
  let messages = req.session.messages || [];
  //Removing the message from the session.
  req.session.messages = [];
  //Pass messages view when the view is rendered
  res.render("login", { title: "Login to your Account", messages: messages });
});

//POST handler to pass user data for the authentication
//Use passport out of the box middleware to authenticate user.
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/login",
    failureMessage: "Invalid Credentials",
  })
);

//GET handler navigate to the register page
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Sign up for an Account" });
});

//POST handler to pass the registration data into database
router.post("/register", (req, res, next) => {
  //New user created based on the passed information
  User.register(
    new User({
      username: req.body.username,
    }),
    //Getting password to encrypt
    req.body.password,
    (err, newUser) => {
      //Calling Callback function to handle request, weaher it's success or failed
      if (err) {
        //If any error found then it will redirect the user to the register page
        console.log(err);
        res.redirect("/register");
      } else {
        //If registration is successful then redirect to the book list view
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

//Get handler for the github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user.email"] })
);

//Get handler for the callback of the github
router.get(
  "/github/callback",
  //If user failed to authenticate then it will redirect to the login page.
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res, next) => {
    //If user authenticate successfully then takes user on the books viwe
    res.redirect("/books");
  }
);

//Exporting router object
module.exports = router;
