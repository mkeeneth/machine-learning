const run = () => {
  // replace browser console to log in the page
  (function() {
    var logger = document.getElementById("log");
    console.log = function(message) {
      if (typeof message == "object") {
        logger.innerHTML +=
          "<pre style='width: 600px; white-space: normal;'>" +
          (JSON && JSON.stringify ? JSON.stringify(message) : message) +
          "</pre>";
      } else {
        logger.innerHTML += message + "<br />";
      }
    };
  })();

  console.log("Start...");

  // rawData = [{ open: number, high: number, low: number, close: number }]
  function chunk(array, size) {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  }

  const minVal = 239.99;

  function scaleDown(step) {
    // normalize
    return {
      open: step.open / minVal,
      high: step.high / minVal,
      low: step.low / minVal,
      close: step.close / minVal
    };
  }

  function scaleUp(step) {
    // denormalize
    return {
      open: step.open * minVal,
      high: step.high * minVal,
      low: step.low * minVal,
      close: step.close * minVal
    };
  }

  console.log("Scaling data...");
  const scaledData = rawData.map(scaleDown);

  /*const trainingData = [
  scaledData.slice(0, 5),
  scaledData.slice(5, 10),
  scaledData.slice(10, 15),
  scaledData.slice(15, 20)
];*/

  const trainingData = chunk(scaledData, 5);

  const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 4,
    hiddenLayers: [8, 8, 8],
    outputSize: 4
  });

  console.log("Training network...");
  net.train(trainingData, {
    learningRate: 0.005,
    errorThresh: 0.02
    // log: stats => console.log(stats)
  });

  // console.log(scaleUp(net.run(trainingData[0])));

  // next 5 days prices
  console.log(net.forecast(trainingData, 5).map(scaleUp));
  console.log("Done.");
};

// run after dom ready
document.addEventListener("DOMContentLoaded", function() {
  run();
});
