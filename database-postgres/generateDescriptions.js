const faker = require('faker');
const fs = require('fs');
const path = require('path');
const writeDescriptions = fs.createWriteStream(
  path.join(__dirname, '..', 'database-postgres-data', 'description.csv')
);
writeDescriptions.write('');

function writeTenMillionDescriptions(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const title = faker.commerce.productName();
      const description = faker.lorem.sentences();
      const sku = Math.floor(Math.random() * 10000000);
      const primary_brand = faker.company.companyName();
      const days_to_ship = `Ships In ${Math.floor(
        Math.random() * 10
      )} Business Days`;
      const data = `"${title}","${description}",${sku},"${primary_brand}", "${days_to_ship}", ${
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

writeTenMillionDescriptions(writeDescriptions, 'utf-8', () => {
  writeDescriptions.end();
});
