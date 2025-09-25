// app_api/models/trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    code:    { type: String, required: true, trim: true, uppercase: true, unique: true },
    title:   { type: String, required: true, trim: true, minlength: 3 },
    summary: { type: String, required: true, trim: true },
    length:  { type: Number, required: true, min: 1, validate: Number.isInteger },
    price:   { type: Number, required: true, min: 0 },
    start:   { type: Date },                 // optional for now
    image:   { type: String, trim: true },   // used by your hbs file
    tags:    [{ type: String, trim: true }]  // optional
  },
  { timestamps: true }
);

tripSchema.index({ code: 1 }, { unique: true });

module.exports = mongoose.model('Trip', tripSchema);
