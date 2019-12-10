"use strict";

const AuthorizationService = use("App/Services/AuthorizationService");
const Config = use("Config");
const rolesObj = Config.get("roles");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminAccess {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth }, next) {
    const user = auth.user;
    await AuthorizationService.verifyRole(user, rolesObj.ADMIN);
    await next();
  }
}

module.exports = AdminAccess;
