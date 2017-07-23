"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const flash = require('connect-flash');

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const listsRoutes = require("./routes/lists");
const markerRoutes = require("./routes/markers");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const logoutRoutes = require("./routes/logout");
const profileRoutes = require("./routes/profile");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(cookieSession({
  name: "session",
  keys: ["banana", "blue"]
}))
app.use(flash());

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use((req, res, next) => {
  app.locals.user = req.session.user;
  next();
})

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/lists", listsRoutes(knex));
app.use("/api/markers", markerRoutes(knex));
app.use("/api/login", loginRoutes(knex));
app.use("/api/register", registerRoutes(knex));
app.use("/api/logout", logoutRoutes(knex));
app.use("/api/profile", profileRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render('index', {
    errors: req.flash('errors'),
    errorsMessage: req.flash('errorsMessage')
 });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
