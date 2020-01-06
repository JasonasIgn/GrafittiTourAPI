"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response }) {
    if (error.name === "ExpiredJwtToken") {
      response.status(401).send({ error: "Access token has expired" });
      return;
    }

    if (error.name === "InvalidRefreshToken") {
      response.status(401).send({ error: "Invalid refresh token" });
      return;
    }

    if (error.name === "InvalidJwtToken") {
      response.status(401).send({ error: "You must log in to take this action" });
      return;
    }

    return super.handle(...arguments);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
