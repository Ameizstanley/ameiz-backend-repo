// routes/inventoryRoute.js - UPDATED with error route
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const classificationValidation = require('../utilities/classification-validation')
const inventoryValidation = require('../utilities/inventory-validation')


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory item detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));

// Route to trigger intentional error for testing
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

router.get("/", utilities.handleErrors(invController.buildManagement));

// GET route for form
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

// POST route for processing
router.post("/add-classification", 
  classificationValidation.classificationRules(),
  classificationValidation.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// GET route
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// POST route
router.post("/add-inventory",
  inventoryValidation.inventoryRules(),
  inventoryValidation.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

router.get("/test", (req, res) => {
  res.send("Test route works!")
})

module.exports = router;

