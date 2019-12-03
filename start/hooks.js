const { hooks } = require("@adonisjs/ignitor");
// const extendValidator = use("../app/Validators/ValidatorExtender");

hooks.after.providersRegistered(() => {
  require("../app/Validators/ValidatorExtender");
});
