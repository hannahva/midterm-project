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
    if (req.params.list_id > 0) {
      knex
        .select("*")
        .from("lists")
        .where("id", req.params.list_id)
        .then((results) => {
          res.json(results);
        });
    }
  });

  // Get all markers by list_id
  router.get("/:list_id/markers", (req, res) => {
    if (req.params.list_id > 0) {
      knex
        .select("*")
        .from("markers")
        .where("list_id", req.params.list_id)
        .then((results) => {
          res.json(results);
        });
    }
  });

  // Get list contributions
  router.get("/:list_id/contributions", (req, res) => {
    if (req.params.list_id > 0){
    knex
      .select('*')
      .from('contributions')
      .innerJoin('lists', 'contributions.list_id', 'lists.id')
      .where('user_id', req.session.user.id)
      .then((results) => {
        res.json(results);
      });
    }
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

    // Toggle favourites (post version)
  router.post("/:list_id/favourites", (req, res) => {
    // perform validations here
    if (req.params.list_id > 0){
    console.log("list_id", req.params.list_id);
    console.log("user.id", req.session.user.id);
    var favs = {
      list_id: req.params.list_id,
      user_id: req.session.user.id
    }
    knex("favourites")
      .where('user_id', req.session.user.id)
      .andWhere('list_id', req.params.list_id)
      .then(function (result, err) {
        if (err) {
          console.log(err);
        } else {
          if (result.length === 0) {
            knex("favourites")
              .insert(favs).then(function (result, err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Insert into favourite table successful`);
                }
              });
          } else {
            console.log("exists!");
            // Delete it
            knex('favourites')
              .where('user_id', req.session.user.id)
              .andWhere('list_id', req.params.list_id)
              .del()
              .then(function (result, err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Deleted favourite`);
                }
              });
          }
        }
      });

    res.redirect('/');
    }
  });

  // Toggle favourites (get version)
  router.get("/:list_id/favourites", (req, res) => {
    // perform validations here
    if (req.params.list_id > 0){
    console.log("list_id", req.params.list_id);
    console.log("user.id", req.session.user.id);
    var favs = {
      list_id: req.params.list_id,
      user_id: req.session.user.id
    }
    knex("favourites")
      .where('user_id', req.session.user.id)
      .andWhere('list_id', req.params.list_id)
      .then(function (result, err) {
        if (err) {
          console.log(err);
        } else {
          if (result.length === 0) {
            knex("favourites")
              .insert(favs).then(function (result, err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Insert into favourite table successful`);
                }
              });
          } else {
            console.log("exists!");
            // Delete it
            knex('favourites')
              .where('user_id', req.session.user.id)
              .andWhere('list_id', req.params.list_id)
              .del()
              .then(function (result, err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Deleted favourite`);
                }
              });
          }
        }
      });

    res.redirect('/');
    }
  });

  // Update list
  router.post("/:list_id/update", (req, res) => {
    // perform validation here
    if (req.params.list_id > 0){
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
          res.redirect("/");
          // res.send(`Update successful\n`);
        }
      });
    }
  });
  // get form to perform update
  router.get("/:list_id/edit", (req, res) => {
    var getMarker = function (listId, callback){
       knex("lists")
      .where("id", listId)
      .then(function(results) {
        callback(results);
      })
    }
    getMarker(req.params.list_id, function(results){
      console.log(results[0])
      return res.render("partials/edit-list", results[0]);
    })
  })

  // Delete list
  router.get("/:list_id/delete", (req, res) => {
    knex("contributions")
      .where("list_id", req.params.list_id)
      .del()
      .then((results) => {
        knex("lists")
          .where("id", req.params.list_id)
          .del()
          .then((results) => {
            console.log(`Delete successful`);
            res.redirect("/")
          });
      })
  });

  return router;
};
