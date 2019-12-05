"use strict";

const User = use("App/Models/User");
const NotFoundException = use("App/Exceptions/NotFoundException");
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
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const user = auth.user;
    const a = await AuthorizationService.verifyRole(user, rolesObj.ADMIN);
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
    response.status(201).send();
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const { id } = params;
    const user = await User.find(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  /**
   * Gets user graffitis
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getGraffittis({ params, request, response, view }) {
    const { id } = params;
    const user = await User.find(id);
    if (!user) throw new NotFoundException("User not found");
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
  async destroy({ params, request, response }) {
    const { id } = params;
    const user = await User.find(id);

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
  async getMyRatings({ params, request, response, auth }) {
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
  async getMyProfile({ params, request, response, auth }) {
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
  async updateMyProfile({ params, request, response, auth }) {
    const user = auth.user;
    const { username } = request.only(["username"]);
    user.username = username;
    await user.save();
  }
}

module.exports = UserController;
