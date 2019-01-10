// Create express app and passport instances
const express = require('express');
const app = express();
const passport = require('passport');
require('./auth').configurePassport(passport);

// Add Middleware
// General middleware
app.use(express.static('client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('morgan')('combined')); // logs http requests
// Additional middleware needed for Passport
app.use(require('cookie-parser')());
app.use(require('connect-flash')());
app.use(require('express-session')({
  secret: "cats",
  resave: false,
  saveUninitialized: false,
  maxAge: 240000
}));
// Add Passport as middleware
app.use(passport.initialize());
app.use(passport.session());

module.exports = {
  app,
  passport
}