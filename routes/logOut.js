const express = require('express');
const router = express.Router();
const logOut = require('../controllers/logOutController.js');

// Route for fetching all contact submissions
router.get('/', logOut.getLogOut);

module.exports = router;
