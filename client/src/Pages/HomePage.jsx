import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import {
  Table,
  Loading,
  MultiSeriesLineChart,
  StarIconFilled,
} from '../components';
import { useGlobalContext } from '../context';

const socket = io('http://localhost:5000/');
// const socket = io();  // works for the client on the same domain

const HomePage = () => {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { mustardTheme, toggleTheme } = useGlobalContext();

  useEffect(() => {
    socket.on('sendData', (data) => {
      setSensorData(data);
      if (isLoading) {
        setIsLoading(false);
      }
    });
  }, [socket]);

  // calculating chart data
  const chartData = {
    category: [],
    temperature: [],
    batteryLevel: [],
  };

  sensorData.map(({ msTime, temperature, batteryLevel }) => {
    const label = new Date(msTime).toLocaleString('en-GB');
    chartData.category.push({ label });
    chartData.temperature.push({ value: temperature });
    chartData.batteryLevel.push({ value: batteryLevel });
  });

  return (
    <main className="section">
      <header>
        <h1 className="title">Real time sensor data </h1>
        <div className="toggle-btn-container">
          <Link to="/historic-data" className="btn">
            get historic data
          </Link>
          <button className="toggle-btn" onClick={toggleTheme}>
            <StarIconFilled />
          </button>
        </div>
      </header>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="data-section">
          <Table data={sensorData} />
          <div className="chart">
            <MultiSeriesLineChart
              category={chartData.category}
              temperature={chartData.temperature}
              battery={chartData.batteryLevel}
              theme={mustardTheme}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
