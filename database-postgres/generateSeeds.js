const faker = require('faker');
const fs = require('fs');
const path = require('path');
const {
  generateCSVdata,
  generateAttributesShape,
  generateDescriptionsShape,
  generateDetailsShape,
  generateDirectionsShape,
} = require('./generationScript.js');

const writeDescriptions = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'descriptions.csv')
);
writeDescriptions.write(
  'title, description, sku, primary_brand, days_to_ship\n',
  'utf8'
);
generateCSVdata(writeDescriptions, 'utf8', 100, generateDescriptionsShape, 99);

///////
const writeAttributes = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'attributes.csv')
);
writeAttributes.write(
  'primary_color, material,  length, width, description_id\n',
  'utf-8'
);
generateCSVdata(writeAttributes, 'utf8', 100, generateAttributesShape, 99);
////////
const writeDirections = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'directions.csv')
);
writeDirections.write('directions, description_id\n', 'utf8');
generateCSVdata(writeDirections, 'utf8', 100, generateDirectionsShape, 99);
////////
const writeDetails = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'details.csv')
);
writeDetails.write('additional_details, description_id\n', 'utf8');

generateCSVdata(writeDetails, 'utf8', 100, generateDetailsShape, 99);
