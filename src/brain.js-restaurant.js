const restaurants = {
  "Brilliant Yellow Corral": "Monday",
  "Penny’s": "Tuesday",
  "Right Coast Wings": "Wednesday",
  "The Delusion Last Railway Car": "Thursday",
  "Fun Day Inn": "Friday",
  JHOP: "Saturday",
  Owls: "Sunday"
};

// input: { Monday, Tuesday, Wednesday, etc. }
// output: { Restaurant1, Restaurant2 }

const trainingData = [];

for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  trainingData.push({
    input: { [dayOfWeek]: 1 },
    output: { [restaurantName]: 1 }
  });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);

console.log(stats);

console.log(net.run({ Monday: 1 }));

function restaurantForDay(dayOfWeek) {
  const result = net.run({ [dayOfWeek]: 1 });
  let highestValue = 0;
  let highestRestaurantName = "";
  for (let restuarantName in result) {
    if (result[restuarantName] > highestValue) {
      highestValue = result[restuarantName];
      highestRestaurantName = restuarantName;
    }
  }

  return highestRestaurantName;
}

console.log(restaurantForDay("Monday"));
console.log(restaurantForDay("Tuesday"));
console.log(restaurantForDay("Wednesday"));
console.log(restaurantForDay("Thursday"));
console.log(restaurantForDay("Friday"));
console.log(restaurantForDay("Saturday"));
console.log(restaurantForDay("Sunday"));

// invert the model
// input: { Restaurant1, Restaurant2 }
// output: { Monday, Tuesday, Wednesday, etc. }

const invertedTrainingData = [];

for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  invertedTrainingData.push({
    input: { [restaurantName]: 1 },
    output: { [dayOfWeek]: 1 }
  });
}

const net2 = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats2 = net2.train(invertedTrainingData);

console.log(stats2);

console.log(net2.run({ JHOP: 1 }));

function dayForRestaurant(restaurantName) {
  const result = net2.run({ [restaurantName]: 1 });
  let highestValue = 0;
  let highestDayName = "";
  for (let dayOfWeek in result) {
    if (result[dayOfWeek] > highestValue) {
      highestValue = result[dayOfWeek];
      highestDayName = dayOfWeek;
    }
  }

  return highestDayName;
}

for (let restaurantName in restaurants) {
  console.log(restaurantName + " -> " + dayForRestaurant(restaurantName));
}
