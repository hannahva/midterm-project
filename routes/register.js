"use strict";

const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");


module.exports = (knex) => {
  function createUser(email, password) {
//bcrypt password
  const hashed_password = bcrypt.hashSync(password, 10);
  return knex.insert({email: email, password: hashed_password})
      .into("users")
  }
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


//register endpoint
  router.get("/", (req, res) => {
    res.render("index")
    return;
  });

  //register post
  router.route("/").post((req, res) => {
   checkIfUserExists(req.body.email, req.body.password, (err, userFound) => {
    if (err) {
      console.error("Invalid input")
      res.status(403).send(err.stack)
    } else {

      if(userFound) {
        res.redirect("/");
      } else {
        //create a user and do things
        createUser(req.body.email, req.body.password)
        .then(function (result) {
          req.session.user = result[0];
          res.redirect("/");
          return;
        });
      }
    }
   })

  });
  return router;
}
