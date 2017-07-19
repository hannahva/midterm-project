"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // GET all markers
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .then((results) => {
        res.json(results);
    });
  });

  // GET specific marker
  router.get("/:marker_id", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .where("id", marker_id)
      .then((results) => {
        res.json(results);
    });
  });

  // Create new marker
  router.post('/', (req, res) => {
    // perform validations here
    let marker = [];
    console.log(req.body);
    if (true) {
      marker = [{
        list_id: req.body.list_id,
        title: req.body.title,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng
      }];
    }
    // Insert marker into markers, returns the id as a confirmation
    knex('markers')
      .insert(marker, 'id').then(function (id, err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Insert successful`);
          res.send(`Insert successful\n`);
        }
      });
  });

  // Update marker
  router.put('/:marker_id', (req, res) => {
    // perform validation here
    let marker = [{
        name: UNDEFINED,
        description: UNDEFINED,
        lat: UNDEFINED,
        lng: UNDEFINED
      }];
    console.log(req.body);
    if (true) {
      maker = [{
        name: req.body.name,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng
      }];
    }
    knex('markers')
      .where('id', marker_id)
      .update(marker, 'id')
      .then(function (id, err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Update successful`);
          res.send(`Update successful\n`);
        }
      });
  });

  return router;
}

