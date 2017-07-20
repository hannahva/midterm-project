"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');


module.exports = (knex) => {
  const checkUserCredentials = (givenEmail, givenPW, callback) => {
    knex("users")
      .where({ email: givenEmail })
      .asCallback((err, result) => {
        if (err){
          return console.error(err);
        }
        if (!result || !result[0])  {
          callback(new Error('email or password not found'));
          return;
        }
        const pass = result[0].password;
        if (bcrypt.compareSync(givenPW, pass)) {
          callback(null, result[0].id);
        } else {
          callback(new Error('email or password not found'));
        }
    });
  };


  router.get("/", (req, res) => {
    if(!!req.session.user_id){
      res.redirect("/")
      return;
    }
    res.render("./partials/_header")
  });

  router.route("/").post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    checkUserCredentials(req.body.email, req.body.password, (err, userId) => {
      if (err){
        console.error("session not set")
        res.status(403).send("Sorry, email or password incorrect");
      } else {
      req.session.user_id = userId;
      //once /lists route setup, do redirect to it
      res.redirect("/");
      }
    });

  });

  return router;
}


