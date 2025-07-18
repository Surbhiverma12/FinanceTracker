const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  currency: String,
  notifications: Boolean,
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);