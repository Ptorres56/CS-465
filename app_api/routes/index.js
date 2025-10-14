// app_api/routes/index.js
const express = require('express');
const router = express.Router();

const tripsCtrl = require('../controllers/trips');
const authCtrl  = require('../controllers/auth');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// ---- Auth ----
router.post('/login', authCtrl.login);

// ---- Trips (public reads) ----
router.get('/trips', tripsCtrl.list);
router.get('/trips/:code', tripsCtrl.read);

// ---- Trips (protected writes) ----
router.post('/trips', requireAuth, requireAdmin, tripsCtrl.create);
router.put('/trips/:code', requireAuth, requireAdmin, tripsCtrl.update);
router.delete('/trips/:code', requireAuth, requireAdmin, tripsCtrl.remove);

module.exports = router;


