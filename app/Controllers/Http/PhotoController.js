"use strict";

const Photo = use("App/Models/Photo");
const Helpers = use('Helpers')

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
    const profilePic = request.file("photo", {
      types: ["image"],
      size: "2mb"
    });

    const photo = await Photo.create({});

    await profilePic.move(Helpers.tmpPath("uploads"), {
      name: `${photo.id}.jpg`,
      overwrite: true
    });

    if (!profilePic.moved()) {
      return profilePic.error();
    }

    response.status(200).send({ id: photo.id });
  }
}

module.exports = PhotoController;
