// app_server/controllers/travel.js
const Trip = require('../../app_api/models/trip'); // reuse the Mongoose model

// Render /travel with live Mongo data
exports.list = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ title: 1 });
    res.render('pages/travel', {
      title: 'Travel',
      year: new Date().getFullYear(),
      trips
    });
  } catch (err) {
    res.render('pages/travel', {
      title: 'Travel',
      year: new Date().getFullYear(),
      trips: [],
      error: err.message
    });
  }
};

// Keep a JSON endpoint to verify quickly
exports.apiList = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ title: 1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
};

