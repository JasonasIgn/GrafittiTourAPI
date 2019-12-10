"use strict";

const Rating = use("App/Models/Rating");
const Graffiti = use("App/Models/Graffiti");
const AuthorizationService = use("App/Services/AuthorizationService");
const NotFoundException = use("App/Exceptions/NotFoundException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ratings
 */
class RatingController {
  /**
   * Show a list of all ratings.
   * GET ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index() {
    return await Rating.all();
  }

  /**
   * Create/save a new rating.
   * POST ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = auth.user;
    const ratingData = request.only(["rating", "comment"]);
    const { graffiti } = request;

    const rating = await user.ratings().create(ratingData);

    await rating.graffiti().associate(graffiti);
    response.status(201).send();
  }

  /**
   * Display a single rating.
   * GET ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ request: { rating } }) {
    return rating;
  }

  /**
   * Update rating details.
   * PUT or PATCH ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, auth }) {
    const user = auth.user;
    const { rating } = request;

    AuthorizationService.verifyPermission(rating, user);

    const ratingData = request.only(["rating", "comment"]);
    rating.merge(ratingData);

    await rating.save();
  }

  /**
   * Delete a rating with id.
   * DELETE ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request: { rating }, response, auth }) {
    const user = auth.user;
    AuthorizationService.verifyPermission(rating, user);
    await rating.delete();
    response.status(200).send();
  }
}

module.exports = RatingController;
