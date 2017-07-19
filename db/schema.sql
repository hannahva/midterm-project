CREATE TABLE "User" (
  "id" INT,
  "email" VARCHAR(255),
  "password" VARCHAR(255),
  "created_at" TIMESTAMP,
  "created_at" TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE "Lists" (
  "id" INTG,
  "name" VARCHAR(255),
  "description" VARCHAR(255),
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE "markers" (
  "id" INTG,
  "list_id" INTG,
  "user_id" INTG,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  "title" VARCHAR(255),
  "description" VARCHAR(255),
  "icon" STRING,
  "lat" FLOATS,
  "lng" FLOATS,
  "picture" STRING,
  PRIMARY KEY ("id")
);

CREATE INDEX "FK" ON  "markers" ("list_id", "user_id");

CREATE TABLE "list_users" (
  "list_id" INT,
  "user_id" INT
);

CREATE INDEX "FK" ON  "list_users" ("list_id", "user_id");

