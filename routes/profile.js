const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route for the about page
router.get('/', profileController.getProfilePage);


module.exports = router;
