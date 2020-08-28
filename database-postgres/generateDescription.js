const faker = require('faker');
const fs = require('fs');
const writeDescriptions = fs.createWriteStream(
  '../database-postgres-data/description.csv'
);
writeDescriptions.write(
  'id, title, description, SKU, primaryBrand, daysToShip\n',
  'utf8'
);

function writeTenMillionDescriptions(writer, encoding, callback) {
  let i = 50;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const title = faker.commerce.productName();
      const description = faker.lorem.sentences();
      const SKU = Math.floor(Math.random() * 10000000);
      const primaryBrand = faker.company.companyName();
      const daysToShip = `Ships In ${Math.floor(
        Math.random() * 10
      )} Business Days`;
      const data = `${
        id + 99
      },${title},"${description}",${SKU},"${primaryBrand}", "${daysToShip}"\n`;
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