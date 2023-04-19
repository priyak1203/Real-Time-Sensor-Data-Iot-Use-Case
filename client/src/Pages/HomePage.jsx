import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Table from '../components/Table';
import ExampleChart from '../components/ExampleChart';

const socket = io('http://localhost:5000/');
// const socket = io();

const HomePage = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    socket.on('sendData', (data) => setSensorData(data));
  }, [socket]);

  // tempData
  const tempData = sensorData.map((item) => {
    const { temperature, msTime } = item;
    const label = new Date(msTime).toLocaleString('en-GB');
    const value = temperature;
    return { value, label };
  });

  console.log(tempData);

  return (
    <main className="section">
      <header>
        <h1 className="title">Real time sensor data </h1>
        <Link to="/historic-data" className="btn">
          get historic data
        </Link>
      </header>
      <div className="data-section">
        <Table data={sensorData} />
        <ExampleChart data={tempData} />
      </div>
    </main>
  );
};

export default HomePage;
