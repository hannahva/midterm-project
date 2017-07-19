"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/:list_id", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .where("id", list_id)
      .then((results) => {
        res.json(results);
      });
  });

  // Create new list
  router.post('/', (req, res) => {
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
    knex('lists')
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
  router.put('/:list_id', (req, res) => {
    // perform validation here
    let list = [{
      name: UNDEFINED,
      description: UNDEFINED,
    }];
    console.log(req.body);
    if (true) {
      list = [{
        name: req.body.name,
        description: req.body.description
      }];
    }
    knex('lists')
      .where('id', list_id)
      .update(list, 'id')
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
      .where("id", list_id)
      .del()
      .then((results) => {
        res.json(results);
      });
  });

  return router;

}
