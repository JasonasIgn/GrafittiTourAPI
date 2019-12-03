"use strict";

const NotFoundException = use("App/Exceptions/NotFoundException");

class DestroyGraffiti {
  get rules() {
    return {
      id: "exists:graffiti,id"
    };
  }

  get messages() {
    return {
      "id.exists": "Graffiti doesn't exist"
    };
  }

  get data() {
    const { id } = this.ctx.request.params;

    return Object.assign({}, { id });
  }


  get validateAll() {
    return false;
  }

  async fails(errors) {
    return this.ctx.response.status(400).send(errors);
  }
}

module.exports = DestroyGraffiti;
