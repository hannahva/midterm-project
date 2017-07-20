"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
      res.render("index_bootstrap");
  });

  return router;
}