const express = require('express')
const {checkUser} = require('../middlware/authMiddleware.js')
const router = express.Router()

// Index route
router.get('/', checkUser,(req, res) => {
  // Handle the index route logic here
  res.render('index', {
    title:"HOME"
  })
});

// Export the router
module.exports = router;
