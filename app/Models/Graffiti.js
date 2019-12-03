"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Graffiti extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  photos() {
    return this.hasMany("App/Models/Photo");
  }

  ratings() {
    return this.hasMany("App/Models/Rating");
  }

  toString() {
    return "graffiti";
  }
}

module.exports = Graffiti;
