import React, { useEffect, useState } from 'react';
import Table from '../components/Table';

const TableSection = ({ pageData, noOfPages }) => {
  const [currentData, setCurrentData] = useState([]);
  const [page, setPage] = useState(0);

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = pageData.length - 1;
      }
      return prevPage;
    });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > pageData.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  useEffect(() => {
    setCurrentData(pageData[page]);
  }, [page]);

  return (
    <>
      <div className="btn-container">
        <button onClick={prevPage}>prev</button>
        <p>
          {page + 1} of {noOfPages}
        </p>
        <button onClick={nextPage}>next</button>
      </div>
      <Table data={currentData} />
    </>
  );
};

export default TableSection;
