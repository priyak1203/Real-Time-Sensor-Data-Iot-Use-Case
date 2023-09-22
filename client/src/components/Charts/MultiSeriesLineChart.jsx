import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

const MultiSeriesLineChart = ({ category, temperature, battery }) => {
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
      showCanvasBorder: '1',
      captionFontColor: '#14b8a6',
      captionFontSize: '16',
      canvasBorderColor: '#14b8a6',
      canvasBorderAlpha: '70',
      canvasbgColor: '#d7f4f2',
      bgColor: '#f1f5f9',
      borderColor: '#14b8a6',
      yAxisNameFontSize: '12',
      yAxisNameFontColor: '#14b8a6',
      legendBorderThickness: '0',
      legendBgColor: '#d7f4f2',
      legendBgAlpha: '30',
      legendPosition: 'bottom-right',
      legendItemFontSize: '12',
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
        color: '#3e3ec0',
      },
      {
        seriesname: 'Battery',
        data: battery,
        color: '#c0504d',
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

export default MultiSeriesLineChart;
