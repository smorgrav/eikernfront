const plants = require('./denorm');
const fs = require('fs');
const keywords = [];

const addIfNotPresent = (value) => {
  if (!keywords.includes(value)) {
    keywords.push(value);
  }
};

Object.keys(plants).forEach((plantNo) => {
  const plant = plants[plantNo];
  addIfNotPresent(`type:${plant.type}`);
  addIfNotPresent(`type:${plant.type}:gruppe:${plant.gruppe}`);
  addIfNotPresent(`type:${plant.type}:gruppe:${plant.gruppe}:familie:${plant.familie}`);
  addIfNotPresent(`type:${plant.type}:gruppe:${plant.gruppe}:familie:${plant.familie}:slekt:${plant.slekt}`);
  addIfNotPresent(`type:${plant.type}:gruppe:${plant.gruppe}:familie:${plant.familie}:slekt:${plant.slekt}:latin:${plant.latin}`);
  addIfNotPresent(`type:${plant.type}:gruppe:${plant.gruppe}:familie:${plant.familie}:slekt:${plant.slekt}:latin:${plant.latin}:navn:${plant.navn}`);
});

fs.writeFileSync("keywords.json", JSON.stringify(keywords));

