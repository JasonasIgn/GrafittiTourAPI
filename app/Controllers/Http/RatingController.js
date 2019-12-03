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
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await Rating.all();
  }

  /**
   * Render a form to be used for creating a new rating.
   * GET ratings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

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
    const { graffiti_id, ...rest } = request.only([
      "rating",
      "comment",
      "graffiti_id"
    ]);
    const graffiti = await Graffiti.find(graffiti_id);
    if (!graffiti) throw new NotFoundException("Graffiti doesn't exist");

    const rating = await user.ratings().create(rest);

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
  async show({ params, request, response, view }) {
    const { id } = params;
    const rating = await Rating.find(id);
    if (!rating) throw new NotFoundException("Rating not found");
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
  async update({ params, request, response, auth }) {
    const user = auth.user;
    const { id: ratingId } = params;

    const rating = await Rating.find(ratingId);

    AuthorizationService.verifyPermission(rating, user, "rating");

    const ratingData = request.only(["rating", "comment"]);

    await user
      .ratings()
      .where("id", ratingId)
      .update(ratingData);
  }

  /**
   * Delete a rating with id.
   * DELETE ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    const user = auth.user;
    const { id: ratingId } = params;
    const rating = await Rating.find(ratingId);
    AuthorizationService.verifyPermission(rating, user, "rating");
    await rating.delete();
    response.status(200).send();
  }
}

module.exports = RatingController;
