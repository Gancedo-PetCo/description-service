const path = require('path');
const fs = require('fs');

function countLines(csvFileName) {
  return new Promise((resolve, reject) => {
    var i;
    var count = 0;
    fs.createReadStream(
      path.join(__dirname, '..', 'database-postgres-data', `${csvFileName}.csv`)
    )
      .on('data', function (chunk) {
        for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
      })
      .on('end', function () {
        // console.log('Here is the count', count);
        if (count !== undefined) {
          resolve(count);
        } else {
          reject('Rejected in count lines');
        }
      });
  });
  // const result = await promise;
  // return result;
}

async function cheese() {
  try {
    return await countLines('attributes');
    // console.log('IN CHEESE', attributeCount);
    // return attributeCount;
    // resolve(attributeCount);
  } catch (error) {
    console.log('ERROR', error);
  }
}

var anything;
async function test() {
  console.log(await cheese());
  anything = await Cheese();
}
cheese();
// console.log(attributeCount);

module.exports.countLines = countLines;
