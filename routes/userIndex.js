const express = require('express');
const router = express.Router();
const UserIndexController = require('../controllers/userIndexController');


// Route for fetching page

router.get('/', UserIndexController.getIndexPage)
module.exports = router