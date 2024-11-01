const express = require('express')
const router = express.Router()
const adminIndexController = require('../controllers/adminIndexController')


router.get('/', adminIndexController.adminPage)

module.exports = router