"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PhotoSchema extends Schema {
  up() {
    this.create("photos", table => {
      table.increments();
      table.integer('graffiti_id').unsigned().references('id').inTable('graffiti')
      table.timestamps();
    });
  }

  down() {
    this.drop("photos");
  }
}

module.exports = PhotoSchema;
