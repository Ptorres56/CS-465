// app_api/models/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
mongoose.set('strictQuery', true);

mongoose
  .connect(uri)
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo connection error:', err.message));

mongoose.connection.on('disconnected', () => console.warn('Mongo disconnected'));
mongoose.connection.on('reconnected', () => console.log('Mongo reconnected'));
