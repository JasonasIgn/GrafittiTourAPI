"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Role extends Model {
  users() {
    return this.belongsToMany("App/Models/User")
      .pivotTable("user_role")
      .withTimestamps();
  }
}

module.exports = Role;
