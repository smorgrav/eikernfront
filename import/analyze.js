const plants = require('./denorm');

const familie = {};
const type = {};
const gruppe = {};
const slekt = {};
const latin = {};

Object.keys(plants).forEach((plantNo) => {
  const plant = plants[plantNo];
  if (!type[plant.type]) {
    type[plant.type] = 1;
  } else {
    type[plant.type] = type[plant.type] + 1;
  }
  if (!gruppe[plant.gruppe]) {
    gruppe[plant.gruppe] = 1;
  } else {
    gruppe[plant.gruppe] = gruppe[plant.gruppe] + 1;
  }
  if (!slekt[plant.slekt]) {
    slekt[plant.slekt] = 1;
  } else {
    slekt[plant.slekt] = slekt[plant.slekt] + 1;
  }
  if (!latin[plant.latin]) {
    latin[plant.latin] = 1;
  } else {
    latin[plant.latin] = latin[plant.latin] + 1;
  }
});

console.log(gruppe);
console.log(type);
console.log(latin);
