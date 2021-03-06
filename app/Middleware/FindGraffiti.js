"use strict";

const Graffiti = use("App/Models/Graffiti");
const NotFoundException = use("App/Exceptions/NotFoundException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindGraffiti {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params: { id } }, next) {
    let graffitiId = id;
    if (!graffitiId) {
      const { graffiti_id } = request.only(["graffiti_id"]);
      graffitiId = graffiti_id;
    }
    const graffiti = await Graffiti.find(graffitiId);
    if (!graffiti) {
      throw new NotFoundException("Graffiti not found");
    }
    request.graffiti = graffiti;
    await next();
  }
}

module.exports = FindGraffiti;
