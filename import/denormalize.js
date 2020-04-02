const plants = require('./planter');
const observations = require('./observasjoner');
const photos = require('./bilder');
const fs = require('fs')

// Add observation and photo array placeholders
plants.forEach(plant => {
  plant.observations = [];
  plant.photos = [];
});

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const plantHash = convertArrayToObject(plants, 'plante');

// Now add observations and photos to the plantHash
observations.forEach(observation => {
  const plant = plantHash[observation.plante];
  delete observation.plante;
  plant.observations.push(observation);
});

photos.forEach(photo => {
  const plant = plantHash[photo.plante];
  delete photo.plante;
  plant.photos.push(photo);
});


const jsonString = JSON.stringify(plantHash);
fs.writeFile('./denorm.json', jsonString, err => {
  if (err) {
    console.log('Error writing file', err)
  } else {
    console.log('Successfully wrote file')
  }
});

