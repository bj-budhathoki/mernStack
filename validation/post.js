const Validator = require("validator");
const isEmpty = require("./is-Empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 5, max: 300 })) {
    errors.text = "must be 300";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
