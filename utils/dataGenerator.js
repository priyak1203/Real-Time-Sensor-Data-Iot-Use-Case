const moment = require('moment');
const SensorData = require('../models/SensorData');

// Generate random number between 2 numbers
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate sensor data
function getData() {
  return {
    temperature: getRandomNumber(20, 40),
    batteryLevel: getRandomNumber(80, 100),
    timeStamp: moment(Date.now()).format('DD-MM-YYYY'),
    msTime: Date.now(),
  };
}

// Generate and save data in DB every 2 minutes
function dataGenerator() {
  const oneMin = 1000 * 60; // 60s
  setInterval(async () => {
    let data = getData();
    await SensorData.insertMany(data);
  }, oneMin * 2);
}

module.exports = dataGenerator;
