"use strict";
const Factory = use("Factory");

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
Factory.blueprint("App/Models/Role", async (faker, i, data) => {
  return {
    title: data.title
  };
});

Factory.blueprint("App/Models/User", (faker, i, data) => {
  return data;
});
