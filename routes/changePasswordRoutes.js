require("dotenv").config();
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../utils/auth');

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

router.post('/', userController.changePassword);

module.exports = router;