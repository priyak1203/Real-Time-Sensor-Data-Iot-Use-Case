const express = require('express');
const app = express();

require('dotenv').config();

// database connection
const connectDB = require('./db/connect');

// Generating Data
const dataGenerator = require('./utils/dataGenerator');

// data Controller
const { getHistoricData, getAllData } = require('./controllers/dataController');

// error handlers
const errorHandler = require('./middlewares/errorHandler');

// middlewares
app.use(express.json());
app.use(express.static('./public'));

// routes
app.get('/', (req, res) => {
  res.send('Real time sensor data');
});

app.get('/allData', getAllData);

app.post('/historicData', getHistoricData);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
    dataGenerator();
  } catch (error) {
    console.log(error);
  }
};
start();
