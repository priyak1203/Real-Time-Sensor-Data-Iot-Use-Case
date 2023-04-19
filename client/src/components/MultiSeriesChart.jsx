import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

const MultiSeriesChart = ({ category, temperature, battery }) => {
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
      captionFontColor: '#4f81bd',
      captionFontSize: '16',
      canvasBorderColor: '#4f81bd',
      canvasBorderAlpha: '70',
      canvasbgColor: '#dbe5f1',
      bgColor: '#dfe6e9',
      borderColor: '#4f81bd',
      yAxisNameFontSize: '12',
      yAxisNameFontColor: '#4f81bd',
      legendBorderThickness: '0',
      legendBgColor: '#dbe5f1',
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

export default MultiSeriesChart;
