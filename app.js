const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  },
});

// database connection
const connectDB = require('./db/connect');

// Generating Data
const dataGenerator = require('./utils/dataGenerator');

// data Controller
const { getHistoricData, getAllData } = require('./controllers/dataController');

// error handlers
const errorHandler = require('./middlewares/errorHandler');
const SensorData = require('./models/SensorData');

// Socket connections
io.on('connection', (socket) => {
  console.log(`Connected with id : ${socket.id}`);

  setInterval(async () => {
    let dataSet = await SensorData.find().sort({ date: -1 }).limit(20);
    io.emit('sendData', dataSet);
    console.log('data sent');
  }, 10000);
});

// middlewares
app.use(express.json());
app.use(cors());
// app.use(express.static('./public'));

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
    server.listen(PORT, () =>
      console.log(`Server is listening on port: ${PORT}`)
    );
    // dataGenerator();
  } catch (error) {
    console.log(error);
  }
};
start();
