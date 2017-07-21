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
    router.get("/:user_id/favourites", (req, res) => {
    knex
      .select('*')
      .from('favourites')
      .leftJoin('lists', 'favourites.list_id', 'lists.id')
      .where('user_id', req.params.user_id)
      .then((results) => {
        res.json(results);
      });
  });

  return router;
}
