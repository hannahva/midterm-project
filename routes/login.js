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
          callback(null, result[0]);
        } else {
          callback(new Error('email or password not found'));
        }
    });
  };


  router.get("/", (req, res) => {
    if(!!req.session.user){
      res.redirect("/")
      return;
    }
    res.render("index")
  });

  router.route("/").post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    checkUserCredentials(req.body.email, req.body.password, (err, user) => {
      if (err){
        req.flash('errorsMessage', 'Email or password incorrect');
        res.redirect("/")
      } else {
      req.session.user = user;
      res.redirect("/");
      }
    });

  });

  return router;
}


