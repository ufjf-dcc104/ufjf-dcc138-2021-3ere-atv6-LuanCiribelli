function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const mapa1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, getRandomIntInclusive(2,4) , getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1], 
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1, getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), getRandomIntInclusive(2,4), 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export { mapa1 };



