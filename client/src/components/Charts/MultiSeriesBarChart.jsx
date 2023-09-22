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
      captionFontColor: '#14b8a6',
      captionFontSize: '14',
      legendBgColor: '#d7f4f2',
      legendBgAlpha: '30',
      legendPosition: 'center',
      legendItemFontSize: '12',
      legendBorderThickness: '0',
      legenditemfontbold: '1',

      yAxisNameFontSize: '12',
      yAxisNameFontColor: '#14b8a6',
      xAxisNameFontSize: '12',
      xAxisNameFontColor: '#14b8a6',

      bgColor: '#d7f4f2',
      bgAlpha: '50',
      showBorder: 1,
      borderColor: '#14b8a6',
      borderAlpha: '70',

      canvasbgColor: '#d7f4f2',
      canvasbgAlpha: '70',
      canvasbaseColor: '#d7f4f2',
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
        color: '#3e3ec0',
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
