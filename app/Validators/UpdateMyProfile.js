'use strict'

class UpdateMyProfile {
  get rules() {
    return {
      username: "unique:users",
    };
  }

  get messages() {
    return {
      "username.unique": "This username already exists.",
    };
  }
  
  get validateAll() {
    return true;
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = UpdateMyProfile
