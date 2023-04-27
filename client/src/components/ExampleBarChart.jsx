import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

function ExampleBarChart() {
  const dataSource = {
    chart: {
      caption: 'Recent Average Data',
      xaxisname: 'Date',
      yaxisname: 'Average Level',
      formatnumberscale: '1',
      plottooltext:
        '<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label',
      theme: 'fusion',
    },
    categories: [
      {
        category: [
          { label: '03-04-2023' },
          { label: '04-04-2023' },
          { label: '05-04-2023' },
          { label: '06-04-2023' },
          { label: '07-04-2023' },
        ],
      },
    ],
    dataset: [
      {
        seriesname: 'Average Temperature',
        data: [
          { value: 30.533 },
          { value: 29.927 },
          { value: 29.111 },
          { value: 33.9 },
          { value: 28.7 },
        ],
      },
      {
        seriesname: 'Average Battery Level',
        data: [
          { value: 90.067 },
          { value: 90.309 },
          { value: 91 },
          { value: 90.5 },
          { value: 91 },
        ],
      },
    ],
  };

  return (
    <ReactFusioncharts
      type="mscolumn3d"
      width="100%"
      height="100%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default ExampleBarChart;
