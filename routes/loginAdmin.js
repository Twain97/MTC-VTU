const express = require('express');
const router = express.Router();
const loginAdminController = require('../controllers/loginAdminController ');

// Route for fetching all contact submissions
router.get('/', loginAdminController.getCreatePage);

router.post('/', loginAdminController.login_post)

router.get('/', loginAdminController.login_get)
module.exports = router;
