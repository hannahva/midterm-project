## WikiMaps

A Multi-page application that allows registered users to mark their favourite hot spots on a map and group those markers together on a list to share with others.

The application is built using Node.js, Express, ES6 for server side & ES5 for the client side javascript, jQuery, SASS, a PostgreSQL database and Knex.js.


## Project Setup

1. Fork this repository.
2. Clone your fork.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Run the following commands in psql to create database
  `CREATE ROLE <role> WITH LOGIN password <password>`
  `CREATE DATABASE <database> OWNER <role>`
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Run migrations: `npm run knex migrate:latest`
7. Run the seed: `npm run knex seed:run`
8. Run the server: `npm run local`
9. Visit http://localhost:8080/

## Dependencies

- Node.js 5.10.x 
- NPM  
- EJS 
- Express 
- Knex.js 
- Knex-logger 
- bcrypt 
- body-parser 
- cookie-session 
- dotenv 
- moment.js 
- method-override 
- morgan 
- node-sass-middleware
- pg 

## Final Product

!["Screenshot of Login page"](https://github.com/hannahva/midterm-project/blob/master/public/docs/Login-page.png)
!["Screenshot of List"](https://github.com/hannahva/midterm-project/blob/master/public/docs/list-page.png)
!["Screenshot of Marker card"](https://github.com/hannahva/midterm-project/blob/master/public/docs/marker-card.png)
!["Screenshot of update form"](https://github.com/hannahva/midterm-project/blob/master/public/docs/edit-marker.png)

