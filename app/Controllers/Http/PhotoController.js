"use strict";

const Photo = use("App/Models/Photo");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class PhotoController {
  /**
   * Create/save a new graffiti.
   * POST graffittis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const photoData = request.only(["name"]);
    const photo = await Photo.create(photoData);
    return photo.id;
  }
}

module.exports = PhotoController;
