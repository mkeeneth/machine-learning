
// init
const X_MAX = 400;
const Y_MAX = 400;
const ITERATIONS = 1000000; // 1 million
// const ITERATIONS = 10000000; // 10 million
// const ITERATIONS = 10;

const rand = (high, low) => Math.random() * (high - low) + low;

const generatePoints = num => {
  return Array.from({ length: num }, () => ({
    x: rand(0, X_MAX),
    y: rand(0, Y_MAX)
  }));
};

// starting point
const randomWeights = () => ({
  x: rand(-1, 1),
  y: rand(-1, 1)
});

// for training with known values
const team = point => (point.x > point.y ? 1 : -1);

const guess = (weights, point) => {
  const sum = point.x * weights.x + point.y * weights.y;
  const team = sum >= 0 ? 1 : -1;
  return team;
};

const train = function(weights, point, team) {
  const guessResult = guess(weights, point); // 1
  const error = team - guessResult;
  const learningRate = 0.1;
  return {
    x: weights.x + point.x * error * learningRate,
    y: weights.y + point.y * error * learningRate
  };
};

const genTrainedWeights = async (randomWeightsSeed) => {
  const examples = generatePoints(ITERATIONS).map(point => ({
    point,
    team: team(point)
  }));

  let currentWeights = randomWeightsSeed();
  console.log(`Random weights ${JSON.stringify(currentWeights)}`);
  for (const example of examples) {
    currentWeights = train(currentWeights, example.point, example.team);
  }
  return currentWeights;
};

const accuracyCheck = () => {
  let svg = document.getElementById("points_svg");
  let points = Array.from(svg.querySelectorAll("circle"));

  let aiFailGuessCount = points.reduce((acc, point) => {
    let aiPointColor = point.getAttribute("fill");
    let refPointColor = point.getAttribute("team");
    return acc + (aiPointColor === refPointColor ? 0 : 1);
  }, 0);

  document.getElementById(
    "accuracy"
  ).innerHTML = `<a href='#' onClick="render();">Run again</a> Incorrect guesses: ${aiFailGuessCount} | Accuracy %: ${((200 -
    aiFailGuessCount) /
    200) *
    100}`;
};

// output
// wait for trainedWeights, then render output and check accuracy
let render = async () => {  
  let weights = await genTrainedWeights(randomWeights);
  console.log(`Trained weights ${JSON.stringify(weights)}`);
  const html = `
  <svg id="points_svg" width="${X_MAX}" height="${Y_MAX}">
    ${generatePoints(200).map(
      point =>
        `<circle 
         cx="${point.x}"
         cy="${point.y}"
         r="3"
         fill="${guess(weights, point) === -1 ? "blue" : "red"}"
         team="${team(point) === -1 ? "blue" : "red"}"/>`
    )}
    <line x1="0" x2="${X_MAX}" y1="0" y2="${Y_MAX}" stroke="purple" stroke-width="3"  />
  </svg>
`;

  document.getElementById("container").innerHTML = html;

  // check how well the AI did
  accuracyCheck();
};

render();
