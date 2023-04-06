const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  temperature: Number,
  batteryLevel: Number,
  timeStamp: String,
  date: { type: Date, default: Date.now },
  msTime: Number,
});

module.exports = mongoose.model('SensorData', DataSchema);
