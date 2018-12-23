// Count to 5
// 1-5, 5-1

const trainingData = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1]];

const net = new brain.recurrent.LSTMTimeStep();

net.train(trainingData);

console.log("5 -> " + net.run([1, 2, 3, 4]));
console.log("1 -> " + net.run([5, 4, 3, 2]));

// bonus 10-5, 5-10

const trainingData2 = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]];

const net2 = new brain.recurrent.LSTMTimeStep();

net2.train(trainingData2);

console.log("7 -> " + Math.round(net2.run([3, 4, 5, 6]))); // 7
console.log("5 -> " + Math.round(net2.run([9, 8, 7, 6]))); // 5
console.log("5 -> " + Math.round(net2.run([5, 4, 3]))); // 5
