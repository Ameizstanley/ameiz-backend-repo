/ middleware/errorHandler.js
const utilities = require("../utilities/")

/* ***************************
 *  Express Error Handler
 *  Place after all other middleware
 * ************************** */
async function errorHandler(err, req, res, next) {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  
  if (err.status == 404) {
    message = err.message
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?'
  }
  
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
}

module.exports = errorHandler