const faker = require('faker');
const fs = require('fs');
const path = require('path');

const createNewDescriptionDocument = (itemId) => {
  const _id = itemId;
  const title = faker.commerce.productName();
  const description = faker.lorem.sentences();
  const SKU = Math.floor(Math.random() * 10000000);
  const primaryBrand = faker.company.companyName();
  const daysToShip = `Ships In ${Math.floor(Math.random() * 10)} Business Days`;
  const directions = faker.lorem.paragraph();
  const primaryColor = faker.commerce.color();
  const material = faker.commerce.productMaterial();
  const length = `${Math.floor(Math.random() * 10)} IN`;
  const width = `${Math.floor(Math.random() * 10)} IN`;
  const additionalDetails = faker.lorem.paragraph();

  return `${_id},"${title}","${description}",${SKU},"${primaryBrand}","${daysToShip}","${directions}","${primaryColor}","${material}","${length}","${width}","${additionalDetails}"`;
};

const generateCouchJSON = (
  writer,
  encoding,
  recordsToWrite,
  dataShapingFunction,
  startingId,
  callback
) => {
  let i = recordsToWrite;
  let id = startingId;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = `${dataShapingFunction(id - 1)}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
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

module.exports.generateCouchJSON = generateCouchJSON;
module.exports.createNewDescriptionDocument = createNewDescriptionDocument;
