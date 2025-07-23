//Needed Resources

const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController");
//const invCont = require("../controllers/invController");
const utilities = require("../utilities/")

//Route to uild inventory by  classification view

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId))

router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

//intentionally trigger a 500 error

// invCont.triggerError = async function (req, res, next) {
//     const error = new Error('this is an intentional 500 error for testing purposes')
//     error.status = 500
//     throw error
    
// }

//build inventory item detail view

module.exports = router;