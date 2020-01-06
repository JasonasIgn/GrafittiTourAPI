'use strict'

const Rating = use("App/Models/Rating");
const NotFoundException = use("App/Exceptions/NotFoundException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindRating {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params: { id } }, next) {
    const rating = await Rating.find(id)
    if (!rating) 
    {
      throw new NotFoundException("Rating not found")
    }
    request.rating = rating;
    await next()
  }
}

module.exports = FindRating