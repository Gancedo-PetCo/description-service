const faker = require('faker');
const fs = require('fs');
const path = require('path');
const writeAttributes = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'attributes.csv')
);
writeAttributes.write('');

function writeTenMillionAttributes(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const primary_color = faker.commerce.color();
      const material = faker.commerce.productMaterial();
      const length = `${Math.floor(Math.random() * 10)} IN`;
      const width = `${Math.floor(Math.random() * 10)} IN`;
      const data = `${primary_color},${material},${length}, ${width},${
        id + 99
      }\n`;
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

writeTenMillionAttributes(writeAttributes, 'utf-8', () => {
  writeAttributes.end();
});
