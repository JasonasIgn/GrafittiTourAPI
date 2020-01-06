"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GraffitiSchema extends Schema {
  up() {
    this.create("graffiti", table => {
      table.increments();
      table.string("name", 80).notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.float("lat").notNullable();
      table.float("lng").notNullable();
      table.float("totalRating").notNullable();
      table.float("totalRated").notNullable();
      table.float("thumbnail").notNullable();
      table.string("description", 511).notNullable();
      table
        .boolean("confirmed")
        .defaultTo(false)
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("graffiti");
  }
}

module.exports = GraffitiSchema;
