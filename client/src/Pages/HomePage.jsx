import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Table from '../components/Table';
import ExampleChart from '../components/ExampleChart';
import MultiSeriesChart from '../components/MultiSeriesChart';

const socket = io('http://localhost:5000/');
// const socket = io();

const HomePage = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    socket.on('sendData', (data) => setSensorData(data));
  }, [socket]);

  // chart data
  const categories = sensorData.map(({ msTime }) => {
    const label = new Date(msTime).toLocaleString('en-GB');
    return { label };
  });

  const temperatureData = sensorData.map(({ temperature }) => {
    return { value: temperature };
  });

  const batteryData = sensorData.map(({ batteryLevel }) => {
    return { value: batteryLevel };
  });

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
        {/* <ExampleChart data={tempData} /> */}
        <MultiSeriesChart
          category={categories}
          temperature={temperatureData}
          battery={batteryData}
        />
      </div>
    </main>
  );
};

export default HomePage;
