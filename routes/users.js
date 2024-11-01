const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Route for fetching all Users
router.get('/', usersController.getAllUsers);

// Route for fetching a single User by ID
router.get('/:id', usersController.getUserById);

// Route for creating a new User
router.post('/', usersController.createUser);

// Route for updating a User
router.put('/:id', usersController.updateUser);

// Route for deleting a User
router.delete('/:id', usersController.deleteUser);

module.exports = router;
