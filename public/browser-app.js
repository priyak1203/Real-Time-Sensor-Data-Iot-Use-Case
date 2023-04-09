const startDateDOM = document.querySelector('#start-date');
const endDateDOM = document.querySelector('#end-date');
const formDOM = document.querySelector('.date-form');

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const start = startDateDOM.value;
  const end = endDateDOM.value;

  console.log({ start, end });
  const dates = { start, end };

  try {
    const response = await fetch('/historicData', {
      method: 'POST',
      body: JSON.stringify(dates),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

// socket
const clientSocket = io();

clientSocket.on('sendData', (data) => {
  console.log(data);
});
