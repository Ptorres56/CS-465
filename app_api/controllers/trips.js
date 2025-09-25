// app_api/controllers/trips.js
const Trip = require('../models/trip');

exports.list = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ title: 1 });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
};

exports.read = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.code.toUpperCase() });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trip', error: err.message });
  }
};
