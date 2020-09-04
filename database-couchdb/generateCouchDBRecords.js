const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const {
  generateCouchJSON,
  createNewDescriptionDocument,
} = require('./generationCouchScript.js');
const { create } = require('domain');

// Write CouchDB Headers
const writeCouchDocuments = fs.createWriteStream(
  path.join(__dirname, '..', 'database-couchdb-data', 'couchDocuments.csv')
);

writeCouchDocuments.write(
  '_id,title, description, SKU, primaryBrand, daysToShip,directions,primaryColor, material, length, width, additionalDetails\n',
  'utf8'
);
generateCouchJSON(
  writeCouchDocuments,
  'utf8',
  100,
  createNewDescriptionDocument,
  100,
  () => console.log('Done Writing')
);
