rubyPoints = document.getElementById('ruby-points');
sapphirePoints = document.getElementById('sapphire-points');
amberPoints = document.getElementById('amber-points');
pearlPoints = document.getElementById('pearl-points');
winner = document.getElementById('winner');
startButton = document.getElementById('start-button');
startButtonContainer = document.getElementById('start-button-container');

let startGameAfterFetch = false;

startButton.addEventListener('click', () => {
  start = true;
  let startOpacity = 1;

  const buttonInterval = setInterval(() => {
    if (startOpacity == 0) {
      startButton.style.display = 'none';
      clearInterval(buttonInterval);
    }
    startButton.style.opacity = startOpacity;
    startOpacity -= 0.01;
  }, 10);
});

let start = false;

const showWinner = () => {
  if (winningIndex == 0) {
    winner.innerHTML = 'RUBY WINS';
    winner.style.backgroundColor = '#c11c22';
  }
  if (winningIndex == 1) {
    winner.innerHTML = 'SAPPHIRE WINS';
    winner.style.backgroundColor = '#1271b5';
  }
  if (winningIndex == 2) {
    winner.innerHTML = 'AMBER WINS';
    winner.style.backgroundColor = '#e46725';
  }
  if (winningIndex == 3) {
    winner.innerHTML = 'PEARL WINS';
    winner.style.backgroundColor = '#000000';
  }

  let winnerOpacity = 0;
  const showWinnerInterval = setInterval(() => {
    winnerOpacity += 0.01;
    if (winner.style.opacity < 1) {
      winner.style.opacity = winnerOpacity;
    } else {
      clearInterval(showWinnerInterval);
    }
  }, 50);
};

const houses = [
  {
    houseReference: rubyPoints,
    totalPoints: 0,
    difference: 0,
    currentNumber: 0,
    winner: false,
  },
  {
    houseReference: sapphirePoints,
    totalPoints: 0,
    difference: 0,
    currentNumber: 0,
    winner: false,
  },
  {
    houseReference: amberPoints,
    totalPoints: 0,
    difference: 0,
    currentNumber: 0,
    winner: false,
  },
  {
    houseReference: pearlPoints,
    totalPoints: 0,
    difference: 0,
    currentNumber: 0,
    winner: false,
  },
];

let winningIndex = 0;
let largestScore = 0;

const findWinner = () => {
  let entry = houses[0].totalPoints;
  for (let i = 1; i < houses.length; i++) {
    if (entry < houses[i].totalPoints) {
      console.log('True');
      winningIndex = i;
      largestScore = i;
      entry = houses[i].totalPoints;
    }
  }
};

fetch('https://arcane-reaches-66470.herokuapp.com/get')
  .then((response) => response.json())
  .then((data) => {
    houses[1].totalPoints = +data[0].points;
    houses[0].totalPoints = +data[1].points;
    houses[2].totalPoints = +data[2].points;
    houses[3].totalPoints = +data[3].points;

    startButtonContainer.style.display = 'block';
    findWinner();
    startGameAfterFetch = true;

    console.log(data);
  });

let finished;

const gameInterval = setInterval(() => {
  if (startGameAfterFetch) {
    console.log(winningIndex);
    finished = 0;
    houses.forEach((house) => {
      if (start) {
        house.difference = house.totalPoints - house.currentNumber;
        if (house.difference > 100) {
          house.currentNumber += Math.floor(Math.random() * 20);
        } else if (house.difference > 50) {
          house.currentNumber += Math.floor(Math.random() * 10);
        } else if (house.difference > 25) {
          house.currentNumber += Math.floor(Math.random() * 5);
        } else if (house.difference > 12) {
          house.currentNumber += Math.floor(Math.random() * 3);
        } else if (house.difference > 0) {
          house.currentNumber += 1;
        }
        house.houseReference.innerHTML = house.currentNumber;

        if (house.difference === 0) {
          finished++;
        }
      }
    });

    if (finished === houses.length) {
      showWinner();
      clearInterval(gameInterval);
    }
  }
}, 70);
