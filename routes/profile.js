"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if(!req.session.user){
      res.redirect("/");
      return;
    } else {
      res.render("profile");
    }
  });

  return router;
};
