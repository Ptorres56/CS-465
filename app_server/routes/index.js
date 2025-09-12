// app_server/routes/index.js
const express = require('express');
const router = express.Router();
const pages = require('../controllers/pages');

router.get('/',        pages.home);
router.get('/travel',  pages.travel);
router.get('/rooms',   pages.rooms);
router.get('/meals',   pages.meals);
router.get('/news',    pages.news);
router.get('/about',   pages.about);
router.get('/contact', pages.contact);

module.exports = router;