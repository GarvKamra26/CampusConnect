const express = require('express');
const router = express.Router();
const getChatrooms = require("../controllers/chatroomsController.js")

const authenticateToken = require("../middleware/authMiddleware.js");

router.get('/', authenticateToken, getChatrooms);

module.exports = router;