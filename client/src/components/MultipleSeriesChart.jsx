import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

// const dataSource = {
//   chart: {
//     caption: 'Support Tickets : Received vs Resolved',
//     yaxisname: '# of Tickets',
//     subcaption: 'Last week',
//     numdivlines: '3',
//     showvalues: '0',
//     legenditemfontsize: '15',
//     legenditemfontbold: '1',
//     plottooltext: '<b>$dataValue</b> Tickets $seriesName on $label',
//     theme: 'fusion',
//   },
//   categories: [
//     {
//       category: [
//         {
//           label: 'Jan 1',
//         },
//         {
//           label: 'Jan 2',
//         },
//         {
//           label: 'Jan 3',
//         },
//         {
//           label: 'Jan 4',
//         },
//         {
//           label: 'Jan 5',
//         },
//         {
//           label: 'Jan 6',
//         },
//         {
//           label: 'Jan 7',
//         },
//       ],
//     },
//   ],
//   dataset: [
//     {
//       seriesname: 'Received',
//       data: [
//         {
//           value: '55',
//         },
//         {
//           value: '45',
//         },
//         {
//           value: '52',
//         },
//         {
//           value: '29',
//         },
//         {
//           value: '48',
//         },
//         {
//           value: '28',
//         },
//         {
//           value: '32',
//         },
//       ],
//     },
//     {
//       seriesname: 'Resolved',
//       data: [
//         {
//           value: '50',
//         },
//         {
//           value: '30',
//         },
//         {
//           value: '49',
//         },
//         {
//           value: '22',
//         },
//         {
//           value: '43',
//         },
//         {
//           value: '14',
//         },
//         {
//           value: '31',
//         },
//       ],
//     },
//   ],
// };

const MultipleSeriesChart = ({ category, temperature, battery }) => {
  const dataSource = {
    chart: {
      caption: 'Real Time Sensor Data for Every 10ms',
      yaxisname: 'Temperature - Battery Level',
      numdivlines: '3',
      showvalues: '0',
      legenditemfontsize: '15',
      legenditemfontbold: '1',
      plottooltext: '<b>$dataValue</b> $seriesName on $label',
      theme: 'fusion',
    },
    categories: [
      {
        category: category,
      },
    ],
    dataset: [
      {
        seriesname: 'Temperature',
        data: temperature,
      },
      {
        seriesname: 'Battery',
        data: battery,
      },
    ],
  };

  return (
    <ReactFusioncharts
      type="msspline"
      width="100%"
      height="100%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default MultipleSeriesChart;
