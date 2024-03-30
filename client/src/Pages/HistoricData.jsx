import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Loading,
  TableSection,
  FormRow,
  MultiSeriesBarChart,
  StarIconFilled,
} from '../components';
import { calculateAvgData } from '../utils/chartData';
import { useGlobalContext } from '../context';
import useFetchHistoricData from '../utils/dataFetch';

const HistoricData = () => {
  const [dates, setDates] = useState({ startDate: '', endDate: '' });
  const { mustardTheme, toggleTheme } = useGlobalContext();

  const {
    isLoading,
    sensorData,
    pageData,
    noOfPages,
    fetchHistoricData,
    error,
  } = useFetchHistoricData();

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setDates({ startDate: '', endDate: '' });
    fetchHistoricData(dates);
  };

  // calculate chart data
  const chartData = calculateAvgData(sensorData);

  return (
    <section className="section">
      <header>
        <h1 className="title">historic data</h1>
        <div className="toggle-btn-container">
          <Link to="/" className="btn">
            back home
          </Link>
          <button className="toggle-btn" onClick={toggleTheme}>
            <StarIconFilled />
          </button>
        </div>
      </header>

      <div className="form">
        <form onSubmit={handleSubmit} className="form-control">
          <FormRow
            name="startDate"
            type="date"
            handleChange={handleChange}
            value={dates.startDate}
            labelText="start date"
          />
          <FormRow
            name="endDate"
            type="date"
            handleChange={handleChange}
            value={dates.endDate}
            labelText="end date"
          />
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
              category={chartData.category}
              temperature={chartData.temperature}
              battery={chartData.batteryLevel}
              theme={mustardTheme}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HistoricData;
