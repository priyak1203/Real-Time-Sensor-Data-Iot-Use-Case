import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { paginate } from '../utils/paginate';
import TableSection from '../components/TableSection';
import ExampleBarChart from '../components/Charts/ExampleBarChart';
import MultiSeriesBarChart from '../components/MultiSeriesBarChart';
import { calculateAvgData } from '../utils/chartData';

const HistoricData = () => {
  const [dates, setDates] = useState({ startDate: '', endDate: '' });
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [noOfPages, setNoOfPages] = useState(null);

  const fetchHistoricData = async () => {
    setIsLoading(true);
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

      const { data: sensorData } = await response.json();
      setSensorData(sensorData); // original data

      const { data, pages } = paginate(sensorData);
      setPageData(data); // paged data
      setNoOfPages(pages);
    } catch (error) {
      console.log(error);
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
      {isLoading ? (
        <Loading />
      ) : (
        sensorData?.length > 0 && (
          <div className="data-section">
            <TableSection pageData={pageData} noOfPages={noOfPages} />
            <div className="chart-section">
              {/* <ExampleBarChart /> */}
              <MultiSeriesBarChart
                category={categories}
                temperature={temperature}
                battery={batteryLevel}
              />
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default HistoricData;
