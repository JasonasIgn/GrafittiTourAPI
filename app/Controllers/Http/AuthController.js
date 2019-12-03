"use strict";

class AuthController {
  /**
   * Login and generate token
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async login({ request, response, view, auth }) {
    const { email, password } = request.only(["email", "password"]);
    return await auth.withRefreshToken().attempt(email, password);
  }

  /**
   * Refresh token
   * POST refresh
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async refresh({ request, response, view, auth }) {
    const { refreshToken } = request.only(["refreshToken"]);
    return await auth.generateForRefreshToken(refreshToken)
  }

}

module.exports = AuthController;
