import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

function MultiSeriesBarChart({ category, temperature, battery, theme }) {
  const mustard = {
    primaryClr: '#b28900',
    bgClr: '#f1f5f9',
    canvasbgClr: '#f1f5f9',
    legendbgClr: '#d6d1c4',
  };

  const green = {
    primaryClr: '#4d7c0f',
    bgClr: '#eaf5e1',
    canvasbgClr: '#eaf5e1',
    legendbgClr: '#eaf5e1',
  };

  const main = theme ? { ...mustard } : { ...green };

  const dataSource = {
    chart: {
      caption: 'Recent Average Data',
      xaxisname: 'Date',
      yaxisname: 'Average Values',
      formatnumberscale: '1',
      plottooltext: 'The <b>$seriesName</b> is <b>$dataValue</b> on  $label',
      theme: 'fusion',
      captionFontColor: main.primaryClr,
      captionFontSize: '14',
      legendBgColor: main.legendbgClr,
      legendBgAlpha: '30',
      legendPosition: 'center',
      legendItemFontSize: '12',
      legendBorderThickness: '0',
      legenditemfontbold: '1',

      yAxisNameFontSize: '12',
      yAxisNameFontColor: main.primaryClr,
      xAxisNameFontSize: '12',
      xAxisNameFontColor: main.primaryClr,

      bgColor: main.bgClr,
      bgAlpha: '50',
      showBorder: 1,
      borderColor: main.primaryClr,
      borderAlpha: '70',

      canvasbgColor: main.canvasbgClr,
      canvasbgAlpha: '70',
      canvasbaseColor: main.canvasbgClr,
      canvasbaseAlpha: '70',
      showCanvasBg: '0',
      showCanvasBase: '0',

      valueFontBold: '1',
      valueAlpha: '80',
    },
    categories: [
      {
        category: category,
      },
    ],
    dataset: [
      {
        seriesname: 'Average Temperature',
        data: temperature,
        color: '#289d8c',
      },
      {
        seriesname: 'Average Battery Level',
        data: battery,
        color: '#c0504d',
      },
    ],
  };

  return (
    <ReactFusioncharts
      type="mscolumn3d"
      width="100%"
      height="430"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default MultiSeriesBarChart;
