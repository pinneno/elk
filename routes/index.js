const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

const {catchErrors} = require('../handlers/errorHandlers');

// * Do work here
router.get('/', homeController.homePage);
router.get('/inventory', homeController.addInventory);
router.post('/inventory', catchErrors(homeController.createInventory));

module.exports = router;