const Validator = require("validator");
const isEmpty = require("./is-Empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 character";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "name required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be at leat 6 charecter";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
