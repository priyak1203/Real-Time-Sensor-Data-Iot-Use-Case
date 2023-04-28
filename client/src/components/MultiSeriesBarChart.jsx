import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

function MultiSeriesBarChart() {
  const dataSource = {
    chart: {
      caption: 'Recent Average Data',
      xaxisname: 'Date',
      yaxisname: 'Average Values',
      formatnumberscale: '1',
      plottooltext: 'The <b>$seriesName</b> is <b>$dataValue</b> on  $label',
      theme: 'fusion',
      captionFontColor: '#4f81bd',
      captionFontSize: '14',
      legendBgColor: '#dbe5f1',
      legendBgAlpha: '30',
      legendPosition: 'center',
      legendItemFontSize: '12',
      legendBorderThickness: '0',
      legenditemfontbold: '1',

      yAxisNameFontSize: '12',
      yAxisNameFontColor: '#4f81bd',
      xAxisNameFontSize: '12',
      xAxisNameFontColor: '#4f81bd',

      bgColor: '#cfe0f6',
      bgAlpha: '50',
      showBorder: 1,
      borderColor: '#4f81bd',
      borderAlpha: '70',

      canvasbgColor: '#dbe5f1',
      canvasbgAlpha: '70',
      canvasbaseColor: '#dbe5f1',
      canvasbaseAlpha: '70',
      showCanvasBg: '0',
      showCanvasBase: '0',

      valueFontBold: '1',
      valueAlpha: '80',
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
        color: '#289d8c',
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
        color: '#c0504d',
      },
    ],
  };

  return (
    <ReactFusioncharts
      type="mscolumn3d"
      width="100%"
      height="425"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default MultiSeriesBarChart;
