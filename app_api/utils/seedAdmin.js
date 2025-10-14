const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function ensureAdminSeed() {
  const email = 'admin@travlr.com';
  const existing = await User.findOne({ email });
  if (!existing) {
    const passwordHash = await bcrypt.hash('Admin#123', 10);
    await User.create({ email, passwordHash, role: 'admin' });
    console.log('Seeded admin: admin@travlr.com / Admin#123');
  }
}
module.exports = { ensureAdminSeed };