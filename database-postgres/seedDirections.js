const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');

let stream = fs.createReadStream('./database-postgres-data/directions.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function (data) {
    csvData.push(data);
  })
  .on('end', function () {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      host: 'localhost',
      user: 'ericzepeda',
      database: 'gancedo_description',
      password: '',
      port: 5432,
    });

    const query =
      'INSERT INTO directions (id, "directions", "descriptionId") VALUES ($1, $2, $3)';
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
            }
          });
        });
      } finally {
        console.log('Finished seeding Directions!');
        done();
      }
    });
  });

stream.pipe(csvStream);
