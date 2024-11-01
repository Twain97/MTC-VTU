const express = require('express');
const router = express.Router();
const signUpUserController = require('../controllers/signUpUserController');


// Route for fetching all contact submissions
router.get('/', signUpUserController.getCreatePage);

router.post('/', signUpUserController.signup_post)

module.exports = router