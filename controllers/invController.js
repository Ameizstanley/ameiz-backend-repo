const invModel = require("../models/inventory-model")
const utilities = require("../utilities/") // Fixed typo: utitlities -> utilities

const invCont = {}

// Build inventory by classification view
invCont.buildByClassificationId = async function (req, res, next) {
    try {
        const classification_id = req.params.classificationId
        const data = await invModel.getInventoryByClassificationId(classification_id)
        const nav = await utilities.getNav()
        
        // You need to define these variables:
        const className = data.classification_name || "Unknown" // Get from data
        const grid = utilities.buildClassificationGrid(data) || "" // Build grid from data
        
        res.render("./inventory/classification", {
            title: className + " vehicles",
            nav,
            grid,
        })
    } catch (error) {
        next(error) // Pass error to error handler

}

// Build inventory item detail view

invCont.buildByInventoryId = async function (req, res, next) {
    const inv_id = req.params.inv_id
    const data = await invModel.getInventoryByInventoryId(inv_id)

    if(data) {
        const grid = utilities.buildDetailView(data)
        let nav = await utilities.getNav()
        const itemName = `${data.inv_make} ${data.inv_model}) `

        res.render("./inventory/detail", {
            title: itemName,
            nav,
            grid,
            itemName,
        })
    }else{
        const err = new Error("Vehicle not found")
        err.status = 404
        next(err)
    }
}
}
// THIS WAS MISSING - Export the controller
module.exports = invCont      
