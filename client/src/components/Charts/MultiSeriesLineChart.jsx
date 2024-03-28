import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

const MultiSeriesLineChart = ({ category, temperature, battery, theme }) => {
  const mustard = {
    primaryClr: '#b28900',
    bgClr: '#f1f5f9',
    canvasbgClr: '#faf9f6',
    legendbgClr: '#d6d1c4',
  };

  const green = {
    primaryClr: '#4d7c0f',
    bgClr: '#f1f5f9',
    canvasbgClr: '#eaf5e1',
    legendbgClr: '#eaf5e1',
  };

  const main = theme ? { ...mustard } : { ...green };

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
      captionFontColor: main.primaryClr,
      captionFontSize: '16',
      canvasBorderColor: main.primaryClr,
      canvasBorderAlpha: '70',
      canvasbgColor: main.canvasbgClr,
      bgColor: main.bgClr,
      borderColor: main.primaryClr,
      yAxisNameFontSize: '12',
      yAxisNameFontColor: main.primaryClr,
      legendBorderThickness: '0',
      legendBgColor: main.legendbgClr,
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
