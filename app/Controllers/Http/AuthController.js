"use strict";

class AuthController {
  /**
   * Login and generate token
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async login({ request, auth }) {
    const { email, password } = request.only(["email", "password"]);
    return await auth.withRefreshToken().attempt(email, password);
  }

  /**
   * Refresh token
   * POST refresh
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async refresh({ request, auth }) {
    const { refreshToken } = request.only(["refreshToken"]);
    return await auth.generateForRefreshToken(refreshToken)
  }

  /**
   * Refresh token
   * POST refresh
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async logout({ response, auth }) {
    await auth.revokeTokens()
    response.status(200).send({});
  }

}

module.exports = AuthController;
