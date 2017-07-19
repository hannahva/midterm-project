# Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above

# Curl tests

## Get all lists, markers 
`GET /lists`

`curl -X GET http://localhost:8080/api/lists`

## Get individual list, markers 
`GET /lists/:list_id`

`curl -X GET http://localhost:8080/api/lists/:list_id`

## Create new list
`POST /lists`

`curl -X POST --data "name=BestBars&description=AListofthebestbarsinTimbuktu" http://localhost:8080/api/lists`

## Update user 
PUT /lists/:user_id
curl -X PUT http://localhost:3000/users/:user_id -d {}

## Delete user 
DELETE /users/:user_id
curl -X DELETE http://localhost:3000/users/:user_id

## Get all markers 
GET /markers
curl -X GET http://localhost:3000/markers

## Create new marker 
POST /markers
curl -X POST http://localhost:3000/markers -d {}

## Update marker 
PUT /markers/:marker_id
curl -X PUT http://localhost:3000/markers/:marker_id -d {}

## Delete marker 
DELETE /markers/:marker_id
curl -X DELETE http://localhost:3000/markers/:marker_id


