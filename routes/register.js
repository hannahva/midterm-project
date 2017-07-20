"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");


module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("register")
  });

router.route("/").post((req, res) => {
  const textPassword = req.body.password;
  const hashed_password = bcrypt.hashSync(textPassword, 10);

 knex.insert({email: req.body.email, password: hashed_password}).into('users')
  .then( function (result) {
      res.send("successfully logged in");
       })
});
return router;
}

// //register endpoint
// app.get('/register', (req, res) => {
//   let cookieID = req.session.user_id;
//   let templateVars = {
//     user: userDatabase[cookieID],
//     password: userDatabase[bcrypt.hashSync("password", 10)]
//   };
//   res.render("url_register", templateVars);
// });


// app.post("/register", (req, res) => {
//   const textPassword = req.body.password;
//   const hashed_password = bcrypt.hashSync(textPassword, 10);

//   let cookieID = req.session.user_id;
//   let templateVars = { user: userDatabase[cookieID],
//     urls: urlsForUser(cookieID)
//   };
//   //Must enter both email and password to register
//   if((req.body.email && textPassword) === "") {
//     res.status(400).render("error_400", templateVars);
//     return;
//   }
//   // cannot continue if email already exists
//   for (let userid in userDatabase) {
//     let user = userDatabase[userid];
//     if( user["email"] === req.body.email) {
//       res.status(400).render("error400", templateVars);
//       return;
//     }
//   }
//   //generate random ID
//   const ID = generateRandomString();
//   userDatabase[ID] = {
//     id: ID,
//     email: req.body.email,
//     password: hashed_password
//   };
//   req.session.user_id = ID;
//   res.redirect("/urls");
// });

// //function to generate random 6 character string
// function generateRandomString() {
//   let randomString = "";
//   const options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < 6; i ++) {
//     randomString += options.charAt(Math.floor(Math.random() * options.length));
//   }
//   return randomString;
// }
