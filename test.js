const { sampleData } = require('./sampleData');

// console.log(sampleData);

// temp data
const tempData = sampleData.map((item) => {
  const { temperature, batteryLevel, timeStamp } = item;
  return { temperature, batteryLevel, timeStamp };
});

// console.log(tempData);

// temperature data and batteryLevel data
const result = sampleData.reduce((data, item) => {
  const { temperature, batteryLevel, timeStamp } = item;
  if (!data[timeStamp]) {
    data[timeStamp] = {
      totalTemperature: temperature,
      totalBattery: batteryLevel,
      count: 1,
    };
  } else {
    data[timeStamp] = {
      totalTemperature: data[timeStamp].totalTemperature + temperature,
      totalBattery: data[timeStamp].totalBattery + batteryLevel,
      count: data[timeStamp].count + 1,
    };
  }
  return data;
}, {});

console.log(result);

// average temperature value
let avgData = [];

for (const key in result) {
  const avgTemp = Number(
    (result[key].totalTemperature / result[key].count).toFixed(3)
  );
  const avgBattery = Number(
    (result[key].totalBattery / result[key].count).toFixed(3)
  );

  const item = {
    ...result[key],
    date: key,

    avgTemp,
    avgBattery,
  };
  avgData = [...avgData, item];
}

console.log(avgData.reverse().splice(0, 5));

// categories data
const categories = avgData.map(({ date }) => {
  return { label: date };
});

// temp data
const avgTemperature = avgData.map(({ avgTemp }) => {
  return { value: avgTemp };
});

// battery data
const avgBattery = avgData.map(({ avgBattery }) => {
  return { value: avgBattery };
});

// console.log(avgBattery);

// const arr1 = [10, 12, 25, 35, 45, 50, 45, 47];

// console.log(arr1.splice(0, 5));
