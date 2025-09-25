// seed/seed.js
// Loads app_server/models/trips.json into MongoDB using your MONGODB_URI

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize the app's Mongo connection
require('../app_api/models/db');

// Use the same Trip model your app uses
const Trip = require('../app_api/models/trip');

async function run() {
  try {
    // Path to your existing JSON file
    const file = path.join(__dirname, '..', 'app_server', 'models', 'trips.json');

    // Read & parse the JSON
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Clean collection for a deterministic seed
    await Trip.deleteMany({});

    // Normalize codes to uppercase for uniqueness
    const docs = json.map(t => ({ ...t, code: String(t.code || '').toUpperCase() }));

    // Insert
    const result = await Trip.insertMany(docs);

    console.log(`✅ Seeded ${result.length} trips`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    // Close the connection so the script exits
    await mongoose.connection.close();
    console.log('🔌 Mongo connection closed');
  }
}

run();
