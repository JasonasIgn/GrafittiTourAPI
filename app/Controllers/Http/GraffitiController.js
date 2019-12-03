"use strict";
const Graffiti = use("App/Models/Graffiti");
const AuthorizationService = use("App/Services/AuthorizationService");
const NotFoundException = use("App/Exceptions/NotFoundException");

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
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
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
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const { id } = params;
    const graffiti = await Graffiti.find(id);
    if (!graffiti) throw new NotFoundException("Graffiti not found");
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
  async update({ params, request, response, auth }) {
    const user = auth.user;
    const { id: graffitiId } = params;

    const graffiti = await Graffiti.find(graffitiId);

    AuthorizationService.verifyPermission(graffiti, user, "graffiti");

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
  async destroy({ params, request, response, auth }) {
    const user = auth.user;
    const { id: graffitiId } = params;

    const graffiti = await Graffiti.find(graffitiId);

    AuthorizationService.verifyPermission(graffiti, user, "graffiti");

    await graffiti.delete();

    response.status(200).send();
  }

  /**
   * Gets graffiti ratings
   * GET graffittis/:id/ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getRatings({ params, request, response }) {
    const { id } = params;
    const graffiti = await Graffiti.find(id);
    if (!graffiti) throw new NotFoundException("Graffiti not found");
    return graffiti.ratings().fetch();
  }
}

module.exports = GraffitiController;
