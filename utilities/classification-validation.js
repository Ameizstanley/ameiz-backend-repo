const { body, validationResult } = require("express-validator")

const validate = {};

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Classification name cannot contain spaces or special characters")
  ]
}

validate.checkClassificationData = async (req, res, next) => {
  // Handle validation results
}

module.exports = validate;