import { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/Table';

const HistoricData = () => {
  const [dates, setDates] = useState({ startDate: '', endDate: '' });
  const [sensorData, setSensorData] = useState([]);

  const fetchHistoricData = async () => {
    const url = 'http://localhost:5000/historicData';

    const historicDates = { start: dates.startDate, end: dates.endDate };
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(historicDates),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const { data } = await response.json();
      setSensorData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDates({ startDate: '', endDate: '' });
    fetchHistoricData();
  };

  return (
    <section className="section">
      <header>
        <h1 className="title">historic data</h1>
        <Link to="/" className="btn">
          back home
        </Link>
      </header>

      <div className="form">
        <h4>Fetching data between two dates</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="startDate">start date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            onChange={handleChange}
            value={dates.startDate}
          />
          <label htmlFor="end-date">end date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            onChange={handleChange}
            value={dates.endDate}
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <Table data={sensorData} />
    </section>
  );
};

export default HistoricData;
