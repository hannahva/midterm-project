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

  // Create new list
  router.post("/", (req, res) => {
    // perform validations here
    let list;
    console.log("req.body: ", req.body);
    console.log("user.id: ", req.session.user.id)
    if (true) {
      list = {
        name: req.body.name,
        description: req.body.description
      };
      // Insert list into lists, returns the id as a confirmation
      var contrib;
      knex("lists")
        .insert(list, 'id').then(function (id, err) {
          if (err) {
            console.log(err);
          } else {
            contrib = {
              list_id: id[0], // ok this array was freaky
              user_id: req.session.user.id
            };
            console.log("list: ", list);
            console.log(`Insert to lists successful: id=${id}`);
            console.log("contrib:", contrib);
            knex("contributions")
              .insert(contrib).then(function (result, err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Insert to contribution table successful`);
                }
              });
          }
        });
      res.redirect('/');
    }
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
