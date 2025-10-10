// app_api/routes/index.js
const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');

// List and read
router.get('/trips', tripsCtrl.list);
router.get('/trips/:code', tripsCtrl.read);

// Create, update, delete
router.post('/trips', tripsCtrl.create);
router.put('/trips/:code', tripsCtrl.update);
router.delete('/trips/:code', tripsCtrl.remove);

module.exports = router;

