const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// * Do work here
router.get('/', homeController.homePage);

module.exports = router;