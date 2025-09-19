// app_server/routes/index.js
const express = require('express');
const router = express.Router();

const pages = require('../controllers/pages');
const travel = require('../controllers/travel');

router.get('/',        pages.home);
router.get('/travel',  travel.list);      // <-- dynamic now
router.get('/rooms',   pages.rooms);
router.get('/meals',   pages.meals);
router.get('/news',    pages.news);
router.get('/about',   pages.about);
router.get('/contact', pages.contact);

// API endpoint for verification
router.get('/api/trips', travel.apiList);

module.exports = router;