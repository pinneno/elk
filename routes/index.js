const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');



const {catchErrors} = require('../handlers/errorHandlers');

// * Do work here
router.get('/', homeController.homePage);
router.get('/inventory', homeController.addInventory);
router.post('/inventory', catchErrors(homeController.createInventory));


router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);

// * 1. Validate the registration data
// * 2. Register the user
// * 3. Log them in
router.post('/register', 
    userController.validateRegistration,
    userController.register, 
    authController.login
);

module.exports = router;