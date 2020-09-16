"use strict";
const Graffiti = use("App/Models/Graffiti");
const Rating = use("App/Models/Rating");
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
    const uploadsList = request.uploadsList;
    const { uploads, ...graffitiData } = request.only([
      "name",
      "lng",
      "lat",
      "description",
      "thumbnail",
      "uploads"
    ]);
    graffitiData.totalRating = 0;
    graffitiData.totalRated = 0;
    const graffiti = await user.graffittis().create(graffitiData);
    uploadsList.map(async upload => {
      upload.graffiti().associate(graffiti);
    });
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
    const ratings = await graffiti.ratings().fetch();
    let totalRating = 0;
    let totalRated = 0;
    let latestRatings = [];
    const promises = ratings.rows.reverse().map(async (rating, idx) => {
      totalRating += rating.rating;
      totalRated += 1;
      if (idx < 5) {
        const ratingOwner = await rating.user().first();
        rating.username = ratingOwner.username;
        latestRatings.push(rating);
      }
    });
    await Promise.all(promises);

    const resultGraffiti = await Graffiti.query()
      .with("photos")
      .where("id", graffiti.id)
      .first();
    resultGraffiti.totalRating = totalRating;
    resultGraffiti.totalRated = totalRated;
    resultGraffiti.latestRatings = latestRatings;
    return resultGraffiti;
  }

  /**
   * Display a single graffiti.
   * GET graffiti/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getTotalGraffities() {
    const totalCount = await Graffiti.getCount()
    return totalCount;
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

    const graffitiData = request.only([
      "name",
      "lng",
      "lat",
      "description",
      "thumbnail"
    ]);
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
