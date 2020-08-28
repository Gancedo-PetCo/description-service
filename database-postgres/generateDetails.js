const faker = require('faker');
const fs = require('fs');
const writeDetails = fs.createWriteStream(
  '../database-postgres-data/details.csv'
);
writeDetails.write('id, additionalDetails, descriptionId\n', 'utf8');

function writeTenMillionDetails(writer, encoding, callback) {
  let i = 50;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const additionalDetails = faker.lorem.paragraph();
      const data = `${id},${additionalDetails},${id + 99}\n`;
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

writeTenMillionDetails(writeDetails, 'utf-8', () => {
  writeDetails.end();
});
