const errorCont = {}

/* ***************************
 *  Trigger intentional 500 error
 * ************************** */
errorCont.triggerError = async function (req, res, next) {
  // Intentionally throw an error to test error handling
  const error = new Error("Intentional server error for testing purposes")
  error.status = 500
  throw error
}

module.exports = errorCont