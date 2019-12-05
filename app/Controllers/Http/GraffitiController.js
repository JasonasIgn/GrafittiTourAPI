"use strict";
const Graffiti = use("App/Models/Graffiti");
const AuthorizationService = use("App/Services/AuthorizationService");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with graffiti
 */
class GraffitiController {
  /**
   * Show a list of all graffiti.
   * GET graffiti
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index() {
    return await Graffiti.all();
  }

  /**
   * Create/save a new graffiti.
   * POST graffittis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = auth.user;
    const graffitiData = request.only(["name", "longtitude", "latitude"]);
    await user.graffittis().create(graffitiData);
    response.status(201).send();
  }

  /**
   * Display a single graffiti.
   * GET graffiti/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ request: { graffiti } }) {
    return graffiti;
  }

  /**
   * Update graffiti details.
   * PUT or PATCH graffiti/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request: { graffiti }, auth }) {
    const user = auth.user;

    AuthorizationService.verifyPermission(graffiti, user);

    const graffitiData = request.only(["name", "longtitude", "latitude"]);
    await user
      .graffittis()
      .where("id", graffitiId)
      .update(graffitiData);
  }

  /**
   * Delete a graffiti with id.
   * DELETE graffiti/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request: { graffiti }, response, auth }) {
    const user = auth.user;

    AuthorizationService.verifyPermission(graffiti, user);

    await graffiti.delete();

    response.status(200).send();
  }

  /**
   * Gets graffiti ratings
   * GET graffittis/:id/ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async getRatings({ request: { graffiti } }) {
    return graffiti.ratings().fetch();
  }
}

module.exports = GraffitiController;
