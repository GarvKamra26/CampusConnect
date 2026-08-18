const express = require('express');
const router = express.Router();
const getClubs = require("../controllers/eventController")

router.get('/', getClubs);

module.exports = router;