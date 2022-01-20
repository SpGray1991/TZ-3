const fetchedRandomNumbers = [];

let randomValuesSequence = [];

for (let i = 0; i < 105; i++) {
  randomValuesSequence.push(getRandomNumber());
}

function getRandomNumber() {
  if (fetchedRandomNumbers.length >= 101) {
    return "error";
  }

  const getRandomInt = () => Math.floor(Math.random() * (100 + 1));

  let randomInt = getRandomInt();

  while (fetchedRandomNumbers.includes(randomInt)) {
    randomInt = getRandomInt();
  }

  fetchedRandomNumbers.push(randomInt);

  return randomInt;
}

console.log(getRandomNumber());

console.log(randomValuesSequence);
