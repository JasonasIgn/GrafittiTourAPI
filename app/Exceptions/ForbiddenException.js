"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const message = "You are not allowed to take this action";
const status = 403;

class ForbiddenException extends LogicalException {
  constructor(customMessage) {
    super(customMessage || message, status);
  }

  handle(error, { response }) {
    response.status(this.status).send({ error: this.message });
  }
}

module.exports = ForbiddenException;
