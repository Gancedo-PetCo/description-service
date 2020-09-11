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

//Create Descriptions Write Stream
const writeDescriptions = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'descriptions.csv')
);
// Write Descriptions Headers
writeDescriptions.write(
  'title, description, sku, primary_brand, days_to_ship\n',
  'utf8'
);
// Generate Descriptions Data
generateCSVdata(writeDescriptions, 'utf8', 10000000, generateDescriptionsShape, 99, () => console.log('Done generating Descriptions'));

///////

//Create Attributes Write Stream
const writeAttributes = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'attributes.csv')
);
// Write Attributes Headers
writeAttributes.write(
  'primary_color, material,  length, width, description_id\n',
  'utf-8'
);
// Generate Attributes Data
generateCSVdata(writeAttributes, 'utf8', 10000000, generateAttributesShape, 99, () => console.log('Done generating Attribtues'));

////////

//Create Directions Write Stream
const writeDirections = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'directions.csv')
);
// Write Directions Headers
writeDirections.write('directions, description_id\n', 'utf8');
// Generate Directions Data
generateCSVdata(writeDirections, 'utf8', 10000000, generateDirectionsShape, 99, () => console.log('Done generating Directions'));

////////

//Create Details Write Stream
const writeDetails = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'details.csv')
);
// Write Details Headers
writeDetails.write('additional_details, description_id\n', 'utf8');
// Generate Details Data
generateCSVdata(writeDetails, 'utf8', 10000000, generateDetailsShape, 99, () => console.log('Done generating Details'));
