const faker = require('faker');
const fs = require('fs');
const path = require('path');

const generateAttributesShape = () => {
  const primary_color = faker.commerce.color();
  const material = faker.commerce.productMaterial();
  const length = `${Math.floor(Math.random() * 10)} IN`;
  const width = `${Math.floor(Math.random() * 10)} IN`;
  return `"${primary_color}","${material}", "${length}", "${width}"`
}
const generateDescriptionsShape = () => {
  const title = faker.commerce.productName();
  const description = faker.lorem.sentences();
  const sku = Math.floor(Math.random() * 10000000);
  const primary_brand = faker.company.companyName();
  const days_to_ship = `Ships In ${Math.floor(Math.random() * 10)} Business Days`;
  return `"${title}", "${description}", ${sku}, "${primary_brand}", "${days_to_ship}"`
}

const generateDetailsShape = () => {
  const additional_details = faker.lorem.paragraph();
  return `"${additional_details}"`
}

const generateDirectionsShape = () => {
  const directions = faker.lorem.paragraph();
  return `"${directions}"`
}

const  generateCSVdata = (writer, encoding, recordsToWrite, dataShapingFunction, startingDescriptionIdMinusOne, callback)  => {
  let i = recordsToWrite;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = `${dataShapingFunction()},${id +startingDescriptionIdMinusOne }\n`;
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
}

module.exports.generateCSVdata = generateCSVdata;
module.exports.generateAttributesShape = generateAttributesShape;
module.exports.generateDescriptionsShape = generateDescriptionsShape;
module.exports.generateDetailsShape = generateDetailsShape;
module.exports.generateDirectionsShape = generateDirectionsShape;
