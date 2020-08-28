const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');

let stream = fs.createReadStream('./database-postgres-data/description.csv');
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
      'INSERT INTO description (id, title, description, "SKU", "primaryBrand", "daysToShip") VALUES ($1, $2, $3, $4, $5, $6)';

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log('inserted ' + res.rowCount + ' row:', row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);
