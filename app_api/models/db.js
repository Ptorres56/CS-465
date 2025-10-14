// app_api/models/db.js
require('dotenv').config();
const mongoose = require('mongoose');

// Ensure models are registered before seeding
require('./trip');       // Trip model
require('./user');       // User model (you created this in models/user.js)

// Admin seeder
const { ensureAdminSeed } = require('../utils/seedAdmin');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

mongoose.connect(uri)
  .then(async () => {
    console.log('Mongo connected');
    await ensureAdminSeed();  // ← seeds admin@travlr.com / Admin#123 once
  })
  .catch(err => {
    console.error('Mongo connection error:', err);
  });

// optional: export the connection if you need elsewhere
module.exports = mongoose.connection;
