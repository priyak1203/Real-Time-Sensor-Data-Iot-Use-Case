import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Table from '../components/Table';
import Loading from '../components/Loading';
import MultiSeriesLineChart from '../components/Charts/MultiSeriesLineChart';

const socket = io('http://localhost:5000/');
// const socket = io();  // works for the client on the same domain

const HomePage = () => {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.on('sendData', (data) => {
      setSensorData(data);
      if (isLoading) {
        setIsLoading(false);
      }
    });
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="data-section">
          <Table data={sensorData} />
          <div className="chart">
            <MultiSeriesLineChart
              category={categories}
              temperature={temperatureData}
              battery={batteryData}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
