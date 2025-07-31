const regValidate = require('../utilities/account-validation')
const express = require('express');
const router = express.Router(); // Fix: Use express.Router() instead of requiring static
const accountController = require("../controllers/accountController"); // Fix: Correct spelling
const utilities = require("../utilities/index");

// Existing route
router.get('/account', (req, res) => {
    res.send('<h1>My Account Page</h1><p>Welcome to your account!</p>'); // Fix: HTML syntax
});

// Login routes
router.get('/login', accountController.buildLogin);


//registration routes
router.get('/register', accountController.buildRegister);

//registration post
router.post
   ('/register',
    regValidate.registationRules,
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))


module.exports = router;
