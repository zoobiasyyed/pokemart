set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "products" (
  "productId" serial PRIMARY KEY,
  "name" text,
  "category" text,
  "price" integer,
  "description" text
);

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text UNIQUE,
  "hashedPassword" text NOT NULL
);

CREATE TABLE "cart" (
  "cartId" serial PRIMARY KEY,
  "userId" integer NOT NULL
);

CREATE TABLE "cartItems" (
  "cartItemId" serial PRIMARY KEY,
  "cartId" integer NOT NULL,
  "productId" integer NOT NULL,
  "quantity" integer DEFAULT 0
);

ALTER TABLE "cart" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "cartItems" ADD FOREIGN KEY ("cartId") REFERENCES "cart" ("cartId");
