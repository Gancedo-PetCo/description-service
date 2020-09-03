const faker = require('faker');
const fs = require('fs');
const path = require('path');

const createNewDescriptionDocument = (itemId) => {
  var newDoc;

  newDoc = {
    _id: `${itemId}`,
    title: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    SKU: Math.floor(Math.random() * 10000000).toString(),
    primaryBrand: faker.company.companyName(),
    daysToShip: `Ships In ${Math.floor(Math.random() * 10)} Business Days`,
    directions: faker.lorem.paragraph(),
    primaryColor: faker.commerce.color(),
    material: faker.commerce.productMaterial(),
    length: `${Math.floor(Math.random() * 10)} IN`,
    width: `${Math.floor(Math.random() * 10)} IN`,
    additionalDetails: faker.lorem.paragraph(),
  };

  return newDoc;
};

const writeData = fs.createWriteStream(
  path.join(__dirname, '..', 'database-couchdb-data', 'data.json')
);

const writeToEnd = () => {
  fs.appendFile(
    path.join(__dirname, '..', 'database-couchdb-data', 'data.json'),
    '\n]}',
    (err) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log('appended to the end');
      }
    }
  );
};

const generateCouchJSON = (
  writer,
  encoding,
  recordsToWrite,
  dataShapingFunction,
  startingDescriptionId,
  callback
) => {
  let i = recordsToWrite;
  let id = 10;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = `\n${JSON.stringify(dataShapingFunction(id - 1))},`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else if (id === startingDescriptionId + 1) {
        writer.write(`{"docs": [${data}`, encoding);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
};

generateCouchJSON(
  writeData,
  'utf8',
  5,
  createNewDescriptionDocument,
  10,
  writeToEnd
);
