import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000/');

function App() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    socket.on('sendData', (data) => setSensorData(data));
  }, [socket]);

  return (
    <div>
      <h1>Real time sensor data </h1>
      <table>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Battery-Level</th>
            <th>Date-Time</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map((item) => {
            const { _id: id, temperature, batteryLevel, msTime } = item;
            return (
              <tr key={id}>
                <td>{temperature}</td>
                <td>{batteryLevel}</td>
                <td>{new Date(msTime).toLocaleString('en-GB')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
