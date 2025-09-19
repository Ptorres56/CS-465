// app_server/controllers/travel.js
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'models', 'trips.json');

function getTrips() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

// Render /travel with dynamic JSON → HBS
exports.list = (req, res) => {
  const trips = getTrips();
  res.render('pages/travel', {
    title: 'Travel',
    year: new Date().getFullYear(),
    trips
  });
};

// Simple API so you can “test” static → dynamic transition
exports.apiList = (req, res) => {
  res.json(getTrips());
};
