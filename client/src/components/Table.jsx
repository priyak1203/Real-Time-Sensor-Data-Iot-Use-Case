import { headers } from '../utils/data';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers?.map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => {
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
  );
};

export default Table;
