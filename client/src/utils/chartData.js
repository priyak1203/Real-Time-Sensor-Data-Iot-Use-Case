export const calculateAvgData = (sensorData) => {
  // calculate total temperature and battery for each day
  const totalData = sensorData.reduce((data, item) => {
    const { temperature, batteryLevel, timeStamp } = item;

    if (!data[timeStamp]) {
      data[timeStamp] = {
        ttlTemperature: temperature,
        ttlBattery: batteryLevel,
        count: 1,
      };
    } else {
      data[timeStamp] = {
        ttlTemperature: data[timeStamp].ttlTemperature + temperature,
        ttlBattery: data[timeStamp].ttlBattery + batteryLevel,
        count: data[timeStamp].count + 1,
      };
    }

    return data;
  }, {});

  // calculate average temperature and battery for each day
  let avgData = [];
  for (const date in totalData) {
    const avgTemperature = Number(
      (totalData[date].ttlTemperature / totalData[date].count).toFixed(3)
    );

    const avgBattery = Number(
      (totalData[date].ttlBattery / totalData[date].count).toFixed(3)
    );

    const newValue = {
      ...totalData[date],
      date,
      avgTemperature,
      avgBattery,
    };

    avgData.push(newValue);
  }

  // limit to latest 5
  avgData.reverse().splice(5);

  // modify data for the chart
  const chartData = {
    category: [],
    temperature: [],
    batteryLevel: [],
  };

  avgData.map((item) => {
    const { date, avgBattery, avgTemperature } = item;
    chartData.category.push({ label: date });
    chartData.temperature.push({ value: avgTemperature });
    chartData.batteryLevel.push({ value: avgBattery });
  });

  return chartData;
};
