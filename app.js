var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var mongoose = require("mongoose");
var config = require("./config/globals");
var hbs = require("hbs");

//imported passport
var passport = require("passport");
//imported express-session (required for passport service)
var session = require("express-session");

var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");
var booksRouter = require("./routes/books");
var genresRouter = require("./routes/genres");
var contactRouter = require("./routes/contact");
var aboutRouter = require("./routes/about");

var user = require("./models/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "LibrarySystem",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//configuring local strategy
//this user.createStrategy() is not mongoose method, it is coming from the pml plugin
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use("/", indexRouter);
//app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/genres", genresRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);

// Configure mongoose after route declarations
// let connStr = 'mongodb+srv://admin:strongpassword2022@cluster0.86msx.mongodb.net/Eduardo';
mongoose
  .connect(
    config.db, // connection string from MongoDB
    {
      useNewUrlParser: true, // options object
      useUnifiedTopology: true,
    }
  )
  .then((message) => console.log("Connected successfully!")) // callback for when conn is OK
  .catch((error) => console.log(error)); // callback for when conn fails

// Add HBS helper methods for formatting dates and selecting values from dropdowns
hbs.registerHelper("createOption", (currentValue, selectedValue) => {
  // initialize selected property
  var selectedProperty = "";
  // if values are equal, set the selected property
  if (currentValue.toUpperCase() == selectedValue.toUpperCase()) {
    selectedProperty = "selected";
    //console.log('selected ' + currentValue);
  }
  // generate html code for the option element with the selected property
  var option = "<option " + selectedProperty + ">" + currentValue + "</option>";
  //console.log(option);
  return new hbs.SafeString(option); // <option>VALUE</option>
});

hbs.registerHelper("toShortDate", (longDateValue) => {
  return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
