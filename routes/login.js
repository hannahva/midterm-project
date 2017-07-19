"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/login", (req, res) => {
    // if(req.session.user_id){
    // res.redirect("/");
    // } else {
    res.send("u made it");
    // }


    // knex
    //   .select()
    //   .from()
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.route("/login").post((req, res) => {
      console.log("login post")
      knex("users").
  });

  return router;
}
