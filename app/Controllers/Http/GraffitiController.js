"use strict";
const Graffiti = use("App/Models/Graffiti");
const Photo = use("App/Models/Photo");
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
    const uploadsList = request.uploadsList
    const {uploads, ...graffitiData} = request.only(["name", "lng", "lat", "description", "uploads"]);
    const graffiti = await user.graffittis().create(graffitiData);
    uploadsList.map(async upload => {
      upload.graffiti().associate(graffiti);
    })
    response.status(201).send({});
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
  async update({ request, auth }) {
    const user = auth.user;
    const { graffiti } = request;

    AuthorizationService.verifyPermission(graffiti, user);

    const graffitiData = request.only(["name", "lng", "lat", "description"]);
    graffiti.merge(graffitiData);
    await graffiti.save();
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
