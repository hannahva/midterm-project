"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.route("/").post((req, res) => {
    req.session = null;
    res.redirect("/api/login")
  });

  return router;
}
