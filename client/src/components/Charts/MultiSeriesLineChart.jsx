import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

const MultiSeriesLineChart = ({ category, temperature, battery }) => {
  const dataSource = {
    chart: {
      caption: 'Real Time Sensor Data for Every 10s',
      yaxisname: 'Temperature - Battery Level',
      numdivlines: '3',
      showvalues: '0',
      legenditemfontsize: '15',
      legenditemfontbold: '1',
      plottooltext: '<b>$dataValue</b> $seriesName on $label',
      theme: 'fusion',
      showCanvasBorder: '1',
      captionFontColor: '#b28900',
      captionFontSize: '16',
      canvasBorderColor: '#b28900',
      canvasBorderAlpha: '70',
      canvasbgColor: '#faf9f6',
      bgColor: '#f1f5f9',
      borderColor: '#b28900',
      yAxisNameFontSize: '12',
      yAxisNameFontColor: '#b28900',
      legendBorderThickness: '0',
      legendBgColor: '#d6d1c4',
      legendBgAlpha: '30',
      legendPosition: 'bottom-right',
      legendItemFontSize: '12',
      showBorder: '1',
      borderThickness: '2',
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
      height="550"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default MultiSeriesLineChart;
