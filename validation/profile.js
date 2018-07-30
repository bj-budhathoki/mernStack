const Validator = require("validator");
const isEmpty = require("./is-Empty");
module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skill = !isEmpty(data.status) ? data.skill : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle needs to be 2 character";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "handle is required";
  }
  if (Validator.isEmpty(data.skill)) {
    errors.skill = "skill is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "status is required";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "not a valid link";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "not a valid link";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "not a valid link";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "not a valid link";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "not a valid link";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
