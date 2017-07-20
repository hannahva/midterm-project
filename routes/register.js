"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");


module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("register")
  });

router.route("/").post((req, res) => {
  const textPassword = req.body.password;
  const hashed_password = bcrypt.hashSync(textPassword, 10);

 knex.insert({email: req.body.email, password: hashed_password}).into('users')
  .then( function (result) {
      res.send("successfully logged in");
       })
});
return router;
}
