"use strict";

class StoreUser {
  get rules() {
    return {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required"
    };
  }

  get messages() {
    return {
      "username.required": "You must provide a username.",
      "username.unique": "This username is already registered.",
      "email.required": "You must provide a email address.",
      "email.email": "You must provide a valid email address.",
      "email.unique": "This email is already registered.",
      "password.required": "You must provide a password"
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = StoreUser;
