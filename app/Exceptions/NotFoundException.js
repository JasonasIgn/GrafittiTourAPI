"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const message = "Not found";
const status = 404;

class NotFoundException extends LogicalException {
  constructor(customMessage) {
    super(customMessage || message, status);
  }

  handle(error, { response }) {
    response.status(this.status).send({ error: this.message });
  }
}

module.exports = NotFoundException;
