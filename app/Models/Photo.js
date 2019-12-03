"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Photo extends Model {
  graffiti() {
    return this.belongsTo("App/Models/Graffiti");
  }
}

module.exports = Photo;
