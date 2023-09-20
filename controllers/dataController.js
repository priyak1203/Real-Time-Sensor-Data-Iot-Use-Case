const asyncWrapper = require('../middlewares/async');
const SensorData = require('../models/SensorData');
const { BadRequestError, NotFoundError } = require('../errors');
const { startOfDay, endOfDay } = require('date-fns');

// get all data
const getAllData = async (req, res) => {
  const results = await SensorData.find({});
  res.status(200).json({ count: results.length, data: results });
};

// get data between two dates
const getHistoricData = asyncWrapper(async (req, res) => {
  const { start, end } = req.body;

  if (!start || !end) {
    throw new BadRequestError('Please provide start and end dates');
  }

  if (start > end) {
    throw new BadRequestError(
      'Start date should be a date prior to the End date'
    );
  }

  const dataSet = await SensorData.find({
    date: { $gte: startOfDay(new Date(start)), $lt: endOfDay(new Date(end)) },
  });

  if (dataSet.length < 1) {
    throw new NotFoundError('No data available for the given dates');
  }

  res.status(200).json({ count: dataSet.length, data: dataSet });
});

module.exports = {
  getHistoricData,
  getAllData,
};
