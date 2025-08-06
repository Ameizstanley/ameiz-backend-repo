const utilities = require(".")
const { body, validationResult } = require("express-validator");
const invModel = require("../models/inventory-model")

const validate = {};

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */

validate.classificationRules = () => {
  return [
    body("classification_name")
    .trim()
    .escape()
    .notEmpty()
    .isLength()
    .withMessage("please provide a classification name.")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("classification name cannot contain spaces or special characters.")
    .custom(async (classification_name) => {
      const classificationExists = await invModel.checkExistingClassification(classification_name)
      if (classificationExists) {
        throw new Error("classification exists. please use different name")
      }
    }),
  ]
}


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */

validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if(!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "add new classification",
      nav,
      classification_name
    })
    return
  }
  next()
}
























validate.inventoryRules = () => {
  return [
    body("classification_id")
      .isInt({ min: 1 })
      .trim()
      .withMessage("Please select a classification")
      .notEmpty(),

    
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .notEmpty()
      .escape()
      .withMessage("Make must be at least 3 characters"),
    
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .notEmpty()
      .withMessage("Model must be at least 3 characters"),
    
    body("inv_year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .trim()
      .escape()
      .isLength({min: 4, max: 4})
      .withMessage("Please provide a valid 4-digit year"),
    

      
    body("inv_price")
      .isFloat({ min: 0 })
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Price must be a positive number"),
    
    body("inv_miles")
      .isInt({ min: 0 })
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Miles must be a positive integer"),



    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({min: 2 })
      .withMessage("please provide a description"),


    body("inv_image")
      .trim()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide an image path."),

    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a thumbnail path."),


    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a color."),


  ]
}

 /* ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const { 
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id 
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}

module.exports = validate