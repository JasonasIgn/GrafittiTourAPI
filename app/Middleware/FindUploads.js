"use strict";

const Photo = use("App/Models/Photo");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindUploads {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    const { uploads } = request.only(["uploads"]);
    const uploadsArray = [];
    const promises = uploads.map(async upload => {
      const photo = await Photo.find(upload);
      if (photo) uploadsArray.push(photo);
    });

    await Promise.all(promises)
    request.uploadsList = uploadsArray;
    await next();
  }
}

module.exports = FindUploads;
