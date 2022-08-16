//Importing different packages
var createError = require("http-errors");
//Imported express module
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//Importing mongoose and hbs package
var mongoose = require("mongoose");
var hbs = require("hbs");

//Importing global file module
var config = require("./config/globals");

//Imported passpoert and otehr authentication packages
var passport = require("passport");
var githubStrategy = require("passport-github2").Strategy;
//Importing express session.
var session = require("express-session");

//Imported different routes modules
var indexRouter = require("./routes/index");
var booksRouter = require("./routes/books");
var genresRouter = require("./routes/genres");
var contactRouter = require("./routes/contact");
var aboutRouter = require("./routes/about");
var User = require("./models/user");

//Importing express function from express module.
var app = express();

//Settig up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Used session object form the express module
app.use(
  session({
    secret: "LibrarySystem",
    resave: false,
    saveUninitialized: false,
  })
);

//Middleware function for initiliazing authentication module
app.use(passport.initialize());
//This middleware function alter the request object and change the user value to which is currently in the active session.
//This takes user from the ssession id from the client cookie.
app.use(passport.session());

//Configuring local strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Configuring strategy for the github authentication.
passport.use(
  new githubStrategy(
    {
      clientID: config.github.clientId,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      //Checking the user is in the database or not.
      const user = await User.findOne({ oauthId: profile.id });
      if (user) {
        return done(null, user);
      } else {
        const newUser = new User({
          username: profile.username,
          oauthId: profile.id,
          oauthProvider: "GitHub",
          created: Date.now(),
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      }
    }
  )
);

//Defined different routers
app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/genres", genresRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);

//Configure mongoose after route declarations
mongoose
  .connect(
    config.db, //Connection string getting from the config module
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  //Callback and display this message when connection is okay
  .then((message) => console.log("Connected successfully!"))
  //Callaback this message when connection is failed
  .catch((error) => console.log(error));

//Add HBS helper methods for formatting dates and selecting values from dropdowns.
hbs.registerHelper("createOption", (currentValue, selectedValue) => {
  //Initialize selected property
  var selectedProperty = "";
  //If values are equal, set the selected property
  if (currentValue.toUpperCase() == selectedValue.toUpperCase()) {
    selectedProperty = "selected";
  }
  //Generate html code for the option element with the selected property
  var option = "<option " + selectedProperty + ">" + currentValue + "</option>";
  //Creating option tag
  return new hbs.SafeString(option);
});

//Conerting date into long string format and format would be en-ca
hbs.registerHelper("toShortDate", (longDateValue) => {
  return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
});

//Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//This is error handler function to handle and display the error
app.use(function (err, req, res, next) {
  //Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //Render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Exporting app module
module.exports = app;
