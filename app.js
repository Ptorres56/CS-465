// app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Controllers
var pages = require('./app_server/controllers/pages');

var app = express();

// ===== View engine setup =====
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// ===== Middleware =====
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static assets (CSS, JS, images) from /public
app.use(express.static(path.join(__dirname, 'public')));

// ===== Redirect .html requests to clean routes =====
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    const clean = req.path.slice(0, -5) || '/';
    return res.redirect(301, clean);
  }
  next();
});

// ===== Routes =====
app.get('/', pages.home);
app.get('/travel', pages.travel);
app.get('/rooms', pages.rooms);
app.get('/meals', pages.meals);
app.get('/news', pages.news);
app.get('/about', pages.about);
app.get('/contact', pages.contact);

// ===== Catch 404 and forward to error handler =====
app.use(function (req, res, next) {
  next(createError(404));
});

// ===== Error handler =====
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

