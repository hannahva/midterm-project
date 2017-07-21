"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // Get all lists
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .then((results) => {
        res.json(results);
      });
  });

  // Get lists by id
  router.get("/:list_id", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .where("id", req.params.list_id)
      .then((results) => {
        res.json(results);
      });
  });

  // Get all markers by list_id
  router.get("/:list_id/markers", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .where("markers.id", req.params.list_id)
      .then((results) => {
        res.json(results);
      });
  });

    // Get list contributions
    router.get("/:list_id/contributions", (req, res) => {
    knex
      .select('*')
      .from('contributions')
      .leftJoin('users', 'contributions.user_id', 'users.id')
      .where('list_id', req.params.list_id)
      .then((results) => {
        res.json(results);
      });
  });

  // knex.select('*').from('users').leftJoin('accounts', 'users.id', 'accounts.user_id')

  // Create new list
  router.post("/", (req, res) => {
    // perform validations here
    let list = [];
    console.log(req.body);
    if (true) {
      list = [{
        name: req.body.name,
        description: req.body.description
      }];
    }
    // Insert list into lists, returns the id as a confirmation
    knex("lists")
      .insert(list, 'id').then(function (id, err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Insert successful`);
          res.send(`Insert successful\n`);
        }
      });
  });

  // Update list
  router.put("/:list_id", (req, res) => {
    // perform validation here
    let list = {};
    // console.log(req.body);
    if (true) {
      list = {
        name: req.body.name,
        description: req.body.description
      };
    }
    knex("lists")
      .where("id", req.params.list_id)
      .update(list, "id")
      .then(function (id, err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Update successful`);
          res.send(`Update successful\n`);
        }
      });
  });

  // Delete list
  router.delete("/:list_id", (req, res) => {
    knex("lists")
      .where("id", req.params.list_id)
      .del()
      .then((results) => {
        console.log(`Delete successful`);
        res.send(`Delete successful\n`);
      });
  });

  return router;

}
