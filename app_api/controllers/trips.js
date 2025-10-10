// app_api/controllers/trips.js
const mongoose = require('mongoose');
const Trip = mongoose.model('Trip'); // defined in app_api/models/trip

// GET /api/trips
exports.list = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ title: 1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
};

// GET /api/trips/:code
exports.read = async (req, res) => {
  try {
    const code = String(req.params.code).toUpperCase();
    const trip = await Trip.findOne({ code });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trip', error: err.message });
  }
};

// POST /api/trips
exports.create = async (req, res) => {
  try {
    const payload = req.body || {};
    // Normalize code to uppercase so lookups are consistent
    if (payload.code) payload.code = String(payload.code).toUpperCase();
    const trip = await Trip.create(payload);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Error creating trip', error: err.message });
  }
};

// PUT /api/trips/:code
exports.update = async (req, res) => {
  try {
    const code = String(req.params.code).toUpperCase();
    const payload = req.body || {};
    const trip = await Trip.findOneAndUpdate({ code }, payload, {
      new: true,
      runValidators: true
    });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: 'Error updating trip', error: err.message });
  }
};

// DELETE /api/trips/:code
exports.remove = async (req, res) => {
  try {
    const code = String(req.params.code).toUpperCase();
    const result = await Trip.findOneAndDelete({ code });
    if (!result) return res.status(404).json({ message: 'Trip not found' });
    res.json({ message: 'Deleted', code });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting trip', error: err.message });
  }
};
