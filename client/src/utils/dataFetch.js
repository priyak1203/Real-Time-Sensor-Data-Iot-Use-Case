import axios from 'axios';
import { useState } from 'react';
import { paginate } from './paginate';

const useFetchHistoricData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [noOfPages, setNoOfPages] = useState(null);

  const [error, setError] = useState({ status: false, msg: '' });

  const handleError = (status = false, msg = '') => {
    setError({ status, msg });
  };

  const fetchHistoricData = async (dates) => {
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

  return {
    sensorData,
    isLoading,
    error,
    pageData,
    noOfPages,
    fetchHistoricData,
  };
};

export default useFetchHistoricData;
