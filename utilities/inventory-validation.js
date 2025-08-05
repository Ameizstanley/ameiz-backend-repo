const { body, validationResult } = require("express-validator");
const validate = {};

validate.inventoryRules = () => {
  return [
    body("classification_id")
      .isInt({ min: 1 })
      .withMessage("Please select a classification"),
    
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters"),
    
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters"),
    
    body("inv_year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Please provide a valid year"),
    
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    
    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive integer"),
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    // You may want to get nav or other data here
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Inventory",
      // add other needed variables here
    });
    return;
  }
  next();
};

// Add other validation/check functions here as needed

module.exports = validate;