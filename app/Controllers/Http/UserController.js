"use strict";

const User = use("App/Models/User");
const AuthorizationService = use("App/Services/AuthorizationService");
const Config = use("Config");
const rolesObj = Config.get("roles");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index() {
    return await User.query()
      .with("roles")
      .fetch();
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const userData = request.only(["username", "password", "email"]);
    const userRole = await AuthorizationService.getRoleId(rolesObj.USER);
    const user = await User.create(userData);

    await user.roles().attach([userRole]);
    response.status(201).send({});
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ request: { user } }) {
    return user;
  }

  /**
   * Gets user graffitis
   * GET users/:id/graffittis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getGraffittis({ request: { user } }) {
    return user.graffittis().fetch();
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    // const userData = request.only(["username"]);
    // await User.create(userData);
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request: { user }, response }) {
    await user.delete();
    response.status(200).send();
  }

  /**
   * Gets user ratings
   * GET user/ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getMyRatings({ auth }) {
    const user = auth.user;
    return user.ratings().fetch();
  }

  /**
   * Gets user ratings
   * GET user/ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getMyProfile({ auth }) {
    return auth.user;
  }

  /**
   * Update user details by authorization header.
   * PUT users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateMyProfile({ request, auth }) {
    const user = auth.user;
    const { username } = request.only(["username"]);
    user.username = username;
    await user.save();
  }
}

module.exports = UserController;
