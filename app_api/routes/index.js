// app_api/routes/index.js
const express = require('express');
const router = express.Router();
const trips = require('../controllers/trips');

router.get('/trips', trips.list);
router.get('/trips/:code', trips.read);

module.exports = router;
