export const calculateAvgData = (sensorData) => {
  const chartData = sensorData.reduce((data, item) => {
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
  for (const date in chartData) {
    const avgTemperature = Number(
      (chartData[date].ttlTemperature / chartData[date].count).toFixed(3)
    );

    const avgBattery = Number(
      (chartData[date].ttlBattery / chartData[date].count).toFixed(3)
    );

    const newValue = {
      ...chartData[date],
      date,
      avgTemperature,
      avgBattery,
    };

    avgData.push(newValue);
  }

  // limit to latest 5
  avgData.reverse().splice(5);

  const categories = avgData.map(({ date }) => {
    return { label: date };
  });

  const temperature = avgData.map(({ avgTemperature }) => {
    return { value: avgTemperature };
  });

  const batteryLevel = avgData.map(({ avgBattery }) => {
    return { value: avgBattery };
  });

  return { categories, temperature, batteryLevel };
};
