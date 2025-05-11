const mongoose = require('mongoose');

// Define the schema for time logs
const TimeLogSchema = new mongoose.Schema({
  domain: String,        // e.g. "youtube.com"
  duration: Number,      // time in seconds
  timestamp: Date        // when it happened
});

// Export the model
module.exports = mongoose.model('TimeLog', TimeLogSchema);
