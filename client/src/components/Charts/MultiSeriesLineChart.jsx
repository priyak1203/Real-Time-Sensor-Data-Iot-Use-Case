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
      captionFontColor: '#4d7c0f',
      captionFontSize: '16',
      canvasBorderColor: '#4d7c0f',
      canvasBorderAlpha: '70',
      canvasbgColor: '#eaf5e1',
      bgColor: '#f1f5f9',
      borderColor: '#4d7c0f',
      yAxisNameFontSize: '12',
      yAxisNameFontColor: '#4d7c0f',
      legendBorderThickness: '0',
      legendBgColor: '#eaf5e1',
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
        color: '#289d8c',
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
