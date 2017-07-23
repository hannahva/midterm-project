"use strict";

const express = require('express');
const router = express.Router();

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
      .where("id", req.params.marker_id)
      .then((results) => {
        res.json(results);
      });
  });

  // Create new marker
  router.post("/", (req, res) => {
    // perform validations here
    let marker = [];
    console.log(req.body);
    if (true) {
      marker = [{
        list_id: req.body.list_id,
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng
      }];
    }
    // Insert marker into markers, returns the id as a confirmation
    knex("markers")
      .insert(marker, "id").then(function (id, err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Insert successful`);
          // res.send(`Insert successful\n`);
        }
      });
  });

  // Update marker
  router.put("/:marker_id", (req, res) => {
    // perform validation here
    let marker = {};
    console.log(req.body);
    if (true) {
      marker = {
        list_id: req.body.list_id,
        user_id: req.body.user_id,
        picture: req.body.picture,
        title: req.body.title,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng
      };
    }
    knex("markers")
      .where("id", req.params.marker_id)
      .update(marker, "id")
      .then(function (id, err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Update successful`);
          // res.send(`Update successful\n`);
        }
      });
  });

  router.get("/:marker_id/edit", (req, res) => {
    var getMarker = function (markerId, callback){
       knex("markers")
      .where("id", markerId)
      .then(function(results) {
        callback(results);
      })
    }
    getMarker(req.params.marker_id, function(results){
      return res.render("markers/edit", results[0]);
    })
  })

  // Delete marker
  router.delete("/:marker_id", (req, res) => {
    knex("markers")
      .where("id", req.params.marker_id)
      .del()
      .then((results) => {
        console.log(`Delete Successful`);
        // res.send(`Delete Successful\n`);
      });
  });

  return router;
}

