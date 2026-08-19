const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware.js");
const {getMessages, postMessages} = require("../controllers/messageController.js");

router.get('/:roomId/messages', authenticateToken, getMessages);

router.post('/:roomId/messages', authenticateToken, postMessages);

module.exports = router;