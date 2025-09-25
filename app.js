// app.js

const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const hbs           = require('hbs');

// Register Handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// ----- Controllers (server-rendered pages) -----
const pages  = require('./app_server/controllers/pages');
const travel = require('./app_server/controllers/travel');

// Create app
const app = express();

// ----- Connect to Mongo once on startup -----
require('./app_api/models/db'); // uses .env MONGODB_URI

// ----- View engine setup -----
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// ----- Middleware -----
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Redirect any ".html" URL to the clean route (e.g., /about.html -> /about)
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    const clean = req.path.slice(0, -5) || '/';
    return res.redirect(301, clean);
  }
  next();
});

// ===== Page Routes (server-rendered) =====
app.get('/',        pages.home);
app.get('/travel',  travel.list);   // now backed by Mongo via controller
app.get('/rooms',   pages.rooms);
app.get('/meals',   pages.meals);
app.get('/news',    pages.news);
app.get('/about',   pages.about);
app.get('/contact', pages.contact);

// ===== API Routes (Mongo-backed JSON) =====
const apiRouter = require('./app_api/routes');
app.use('/api', apiRouter);         // e.g., GET /api/trips, /api/trips/:code

// ===== 404 handler =====
app.use((req, res, next) => {
  next(createError(404));
});

// ===== Error handler =====
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


