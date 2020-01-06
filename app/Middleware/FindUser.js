'use strict'

const User = use("App/Models/User");
const NotFoundException = use("App/Exceptions/NotFoundException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params: { id } }, next) {
    const user = await User.find(id)
    if (!user) 
    {
      throw new NotFoundException("User not found")
    }
    request.user = user;
    await next()
  }
}

module.exports = FindUser