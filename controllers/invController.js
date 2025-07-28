// // controllers/invController.js
// const invModel = require("../models/inventory-model")
// const utilities = require("../utilities/")

// const invCont = {}

// /* ***************************
//  *  Build inventory listing by classification view
//  * ************************** */
// invCont.buildByClassificationId = async function (req, res, next) {
//     try {
//         const classification_id = req.params.classificationId
//         const data = await invModel.getInventoryByClassificationId(classification_id)
//         const nav = await utilities.getNav()
        
//         // Check if data exists and has items
//         let className = "No Classification Found"
//         if (data && Array.isArray(data) && data.length > 0) {
//             // data is an array of vehicles, get classification_name from first item
//             className = data[0].classification_name || "Unknown Classification"
//         }
        
//         // Build the grid from the data array
//         const grid = await utilities.buildClassificationGrid(data || [])
        
//         res.render("./inventory/classification", {
//             title: className + " vehicles",
//             nav,
//             grid,
//         })
//     } catch (error) {
//         next(error) // Pass error to error handler
//     }
// }

// /* ***************************
//  *  Build inventory item detail view
//  * ************************** */
// invCont.buildByInvId = async function (req, res, next) {
//     try {
//         const inv_id = req.params.invId  // Note: invId not inv_id
//         const data = await invModel.getInventoryByInvId(inv_id)  // Note: getInventoryByInvId not getInventoryByInventoryId

//         if (data) {
//             const detailHTML = await utilities.buildDetailView(data)  // Note: buildDetailView not buildClassificationGrid
//             let nav = await utilities.getNav()
//             const vehicleName = `${data.inv_year} ${data.inv_make} ${data.inv_model}`  // Include year

//             res.render("./inventory/detail", {
//                 title: vehicleName,
//                 nav,
//                 detailHTML,  // Note: detailHTML not grid
//                 vehicleName,  // Note: vehicleName not itemName
//             })
//         } else {
//             const err = new Error("Vehicle not found")
//             err.status = 404
//             next(err)
//         }
//     } catch (error) {
//         next(error)
//     }
// }

// module.exports = invCont

// controllers/invController.js - UPDATED with error function
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryItemById(inv_id)
  
  if (data) {
    const vehicleDetail = await utilities.buildVehicleDetailView(data)
    let nav = await utilities.getNav()
    const vehicleTitle = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
    
    res.render("./inventory/detail", {
      title: vehicleTitle,
      nav,
      vehicleDetail,
      vehicleData: data
    })
  } else {
    // Handle case where vehicle is not found
    const nav = await utilities.getNav()
    res.status(404).render("errors/error", {
      title: "Vehicle Not Found",
      nav,
      message: "Sorry, the vehicle you're looking for could not be found."
    })
  }
}

/* ***************************
 *  Trigger intentional error for testing
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  // Intentionally throw an error to test error handling
  const error = new Error("This is an intentional 500 error for testing purposes")
  error.status = 500
  throw error
}

module.exports = invCont