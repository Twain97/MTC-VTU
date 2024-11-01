const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// Route for the about page;
router.get('/', aboutController.getAboutPage);

module.exports = router;
