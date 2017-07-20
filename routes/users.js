"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // Get all users
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

    // Get user favourites
    router.get("/:user_id/favs", (req, res) => {
    knex
      .table('users')
      .innerJoin('favourites', req.params.user_id, '=', 'contributors.user_id')
      .then((results) => {
        res.json(results);
      });
  });

  return router;
}
