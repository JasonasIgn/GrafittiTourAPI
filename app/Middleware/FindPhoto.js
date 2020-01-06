'use strict'

const Photo = use("App/Models/Photo");
const NotFoundException = use("App/Exceptions/NotFoundException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindPhoto {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params: { id } }, next) {
    const photo = await Photo.find(id)
    if (!photo) 
    {
      throw new NotFoundException("Photo not found")
    }
    request.photo = photo;
    await next()
  }
}

module.exports = FindPhoto