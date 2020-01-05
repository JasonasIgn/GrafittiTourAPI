"use strict";

const Photo = use("App/Models/Photo");
const Helpers = use("Helpers");

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
    const profilePics = request.file("photo", {
      types: ["image"],
      size: "2mb"
    });
    const photos = await Photo.createMany(profilePics._files.map(() => ({})));
    await profilePics.moveAll(Helpers.tmpPath("uploads"), (file, index) => {
      return {
        name: `${photos[index].id}.jpg`
      };
    });

    if (!profilePics.movedAll()) {
      return profilePics.errors();
    }
    response.status(200).send(photos.map(photo => ({ id: photo.id })));
  }
}

module.exports = PhotoController;
