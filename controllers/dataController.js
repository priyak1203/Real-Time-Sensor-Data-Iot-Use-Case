const asyncWrapper = require('../middlewares/async');
const SensorData = require('../models/SensorData');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllData = async (req, res) => {
  const results = await SensorData.find({});
  res.status(200).json({ count: results.length, data: results });
};

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

  if (start === end) {
    throw new BadRequestError(
      'Start and End dates cannot be same. End date should be atleast a day more than Start Date'
    );
  }

  const dataSet = await SensorData.find({
    date: { $gte: new Date(start), $lt: new Date(end) },
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
