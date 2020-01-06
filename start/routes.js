"use strict";

const { validator } = use("Validator");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.resource("users", "UserController")
  .validator(new Map([[["users.store"], ["StoreUser"]]]))
  .middleware(
    new Map([
      [
        ["index", "show"],
        ["auth", "adminAccess"]
      ],
      [["show", "destroy"], ["findUser"]]
    ])
  );

Route.get("users/:id/graffittis", "UserController.getGraffittis").middleware([
  "findUser"
]);

Route.get("user/ratings", "UserController.getMyRatings").middleware(["auth"]);

Route.get("user/graffities", "UserController.getMyGraffities").middleware([
  "auth"
]);

Route.get("user", "UserController.getMyProfile").middleware(["auth"]);

Route.post("photo", "PhotoController.store");

Route.get("photo/:id", "PhotoController.show").middleware("findPhoto");

Route.put("users", "UserController.updateMyProfile")
  .middleware(["auth"])
  .validator("UpdateMyProfile");

Route.resource("graffittis", "GraffitiController").middleware(
  new Map([
    [["store", "destroy"], ["auth"]],
    [["show", "update", "destroy"], ["findGraffiti"]]
  ])
);

Route.get(
  "graffittis/:id/ratings",
  "GraffitiController.getRatings"
).middleware(["findGraffiti"]);

Route.resource("ratings", "RatingController").middleware(
  new Map([
    [["store", "destroy", "update"], ["auth"]],
    [["show", "update", "destroy"], ["findRating"]],
    [["store"], ["findGraffiti"]]
  ])
);

Route.post("login", "AuthController.login").middleware(["guest"]);

Route.post("logout", "AuthController.logout").middleware(["auth"]);

Route.post("refresh", "AuthController.refresh");
