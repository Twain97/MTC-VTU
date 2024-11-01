const express = require('express');
const router = express.Router();
const loginUserController = require('../controllers/loginUserController');

// Route for fetching all contact submissions
router.get('/', loginUserController.getCreatePage);

router.post('/', loginUserController.login_post)

router.get('/', loginUserController.login_get)

module.exports = router;
