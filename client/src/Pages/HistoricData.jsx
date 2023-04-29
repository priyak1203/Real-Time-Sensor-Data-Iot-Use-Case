import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { paginate } from '../utils/paginate';
import TableSection from '../components/TableSection';
import ExampleBarChart from '../components/Charts/ExampleBarChart';
import MultiSeriesBarChart from '../components/MultiSeriesBarChart';

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
  const chartData = sensorData.reduce((data, item) => {
    const { temperature, batteryLevel, timeStamp } = item;

    if (!data[timeStamp]) {
      data[timeStamp] = {
        ttlTemperature: temperature,
        ttlBattery: batteryLevel,
        count: 1,
      };
    } else {
      data[timeStamp] = {
        ttlTemperature: data[timeStamp].ttlTemperature + temperature,
        ttlBattery: data[timeStamp].ttlBattery + batteryLevel,
        count: data[timeStamp].count + 1,
      };
    }

    return data;
  }, {});

  // calculate average temperature and battery for each day
  let avgData = [];

  for (const date in chartData) {
    const avgTemperature = Number(
      (chartData[date].ttlTemperature / chartData[date].count).toFixed(3)
    );

    const avgBattery = Number(
      (chartData[date].ttlBattery / chartData[date].count).toFixed(3)
    );

    const newValue = {
      ...chartData[date],
      date,
      avgTemperature,
      avgBattery,
    };

    avgData.push(newValue);
  }

  // limit to latest 5
  avgData.reverse().splice(5);
  console.log(avgData);

  const categories = avgData.map(({ date }) => {
    return { label: date };
  });

  const temperature = avgData.map(({ avgTemperature }) => {
    return { value: avgTemperature };
  });

  const batteryLevel = avgData.map(({ avgBattery }) => {
    return { value: avgBattery };
  });

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
