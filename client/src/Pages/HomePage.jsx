import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Table from '../components/Table';

const socket = io('http://localhost:5000/');
// const socket = io();

const HomePage = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    socket.on('sendData', (data) => setSensorData(data));
  }, [socket]);

  return (
    <main className="section">
      <header>
        <h1 className="title">Real time sensor data </h1>
        <Link to="/historic-data" className="btn">
          get historic data
        </Link>
      </header>

      <Table data={sensorData} />
    </main>
  );
};

export default HomePage;
