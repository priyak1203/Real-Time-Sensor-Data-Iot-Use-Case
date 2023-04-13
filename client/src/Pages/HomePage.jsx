import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Table from '../components/Table';

const socket = io('http://localhost:5000/');

const HomePage = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    socket.on('sendData', (data) => setSensorData(data));
  }, [socket]);

  return (
    <div>
      <h1>Real time sensor data </h1>
      <Link to="/historic-data">get historic data</Link>
      <Table data={sensorData} />
    </div>
  );
};

export default HomePage;
