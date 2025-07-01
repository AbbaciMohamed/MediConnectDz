const mongoose = require('mongoose');
const orgSchema = new mongoose.Schema({
  name: String,
  logo: String,
  domain: String,
  primaryColor: String,
  licenseType: String,
  licenseExpiry: Date,
  branding: Object
});
module.exports = mongoose.model('Organization', orgSchema); 