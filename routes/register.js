"use strict";

const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");


module.exports = (knex) => {
  function createUser(email, password) {
    //insert email and hashed password into db
    const hashed_password = bcrypt.hashSync(password, 10);
    return knex.insert({email: email, password: hashed_password})
      .into("users");
  }
  // check if user email is in the the database
  const checkIfUserExists = (givenEmail, givenPW, callback) => {
    knex("users")
      .where({ email: givenEmail })
      .asCallback((err, result) => {
        if (err) {
          callback(err);
        }
        //if a user is found return true
        if (result.length > 0)  {
          callback(null, true);
        } else {
          callback(null, false);
        }
      });
  };


  //register post
  router.route("/").post((req, res) => {
    checkIfUserExists(req.body.email, req.body.password, (err, userFound) => {
      if (err) {
        req.flash('errors', "Invalid");

      } else {

        //if email is found in db -> send message
        if(userFound) {
          req.flash('errors', 'Email already in use');
          res.redirect("/");
          // if either input field is blank -> send message
        } else if ((req.body.email && req.body.password) === "") {
          req.flash('errors', 'Invalid Information');

          //create a user and do things
          createUser(req.body.email, req.body.password)
            .then(function (result) {
              req.session.user = result[0];

              res.redirect("/");
            });
          //else register user, set cookie session
        } else {
          createUser(req.body.email, req.body.password)
            .then(function (result) {
              req.session.user_id = result[0];
              res.redirect("/");
              return;
            });
        }
      }
    });

  });
  return router;
};
