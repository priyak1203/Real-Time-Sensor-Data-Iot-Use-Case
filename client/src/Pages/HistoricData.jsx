import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import TableSection from '../components/TableSection';
import MultiSeriesBarChart from '../components/Charts/MultiSeriesBarChart';
import { paginate } from '../utils/paginate';
import { calculateAvgData } from '../utils/chartData';

const HistoricData = () => {
  const [dates, setDates] = useState({ startDate: '', endDate: '' });
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [noOfPages, setNoOfPages] = useState(null);

  const [error, setError] = useState({ status: false, msg: '' });

  const handleError = (status = false, msg = '') => {
    setError({ status, msg });
  };

  const fetchHistoricData = async () => {
    setIsLoading(true);
    handleError();
    const url = 'http://localhost:5000/historicData';

    const historicDates = { start: dates.startDate, end: dates.endDate };
    try {
      const {
        data: { data: sensorData },
      } = await axios.post(url, historicDates);

      setSensorData(sensorData); // original data

      const { data, pages } = paginate(sensorData);
      setPageData(data); // paged data
      setNoOfPages(pages);
    } catch (error) {
      handleError(true, error.response.data.msg);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setDates({ startDate: '', endDate: '' });
    fetchHistoricData();
  };

  // calculate chart data
  const { categories, temperature, batteryLevel } =
    calculateAvgData(sensorData);

  return (
    <section className="section">
      <header>
        <h1 className="title">historic data</h1>
        <Link to="/" className="btn">
          back home
        </Link>
      </header>

      <div className="form">
        <form onSubmit={handleSubmit} className="form-control">
          <div>
            <label htmlFor="startDate">start date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              onChange={handleChange}
              value={dates.startDate}
            />
          </div>
          <div>
            <label htmlFor="end-date">end date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              onChange={handleChange}
              value={dates.endDate}
            />
          </div>

          <button type="submit">submit</button>
        </form>
      </div>

      {isLoading && <Loading />}

      {error.status && <h2 className="error-msg">{error.msg}</h2>}

      {!isLoading && !error.status && sensorData?.length > 0 && (
        <div className="data-section">
          <TableSection pageData={pageData} noOfPages={noOfPages} />
          <div className="chart chart-section">
            <MultiSeriesBarChart
              category={categories}
              temperature={temperature}
              battery={batteryLevel}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HistoricData;
