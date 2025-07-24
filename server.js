// server.js
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/")

/* ***********************
 * Middleware
 * ************************/
app.use(static)

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", inventoryRoute)

// Intentional error route (for testing)
app.get("/error/trigger", utilities.handleErrors(async (req, res, next) => {
  const error = new Error("Intentional server error for testing purposes")
  error.status = 500
  throw error
}))

// Catch-all for 404 errors
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler (INLINE)
* Place after all other middleware
*************************/
app.use(async function errorHandler(err, req, res, next) {
  let nav = await utilities.getNav()
  let message = ''
  
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  
  if (err.status == 404) {
    message = err.message
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?'
  }
  
  res.status(err.status || 500)
  
  // Try to render error page, fallback to simple response if view doesn't exist
  try {
    res.render("errors/error", {
      title: err.status || 'Server Error',
      message,
      nav
    })
  } catch (renderError) {
    // Fallback if error view doesn't exist
    res.send(`
      <h1>Error ${err.status || 500}</h1>
      <p>${message}</p>
      <a href="/">Go Home</a>
    `)
  }
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})