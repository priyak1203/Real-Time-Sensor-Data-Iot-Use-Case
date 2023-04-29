import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';

// Resolves charts dependancy
charts(FusionCharts);

function MultiSeriesBarChart({ category, temperature, battery }) {
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
      height="425"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default MultiSeriesBarChart;
