const fs = require('fs');
const path = require('path');
const csv = require('csv-parser')

const {
  generateCSVdata,
  generateAttributesShape,
  generateDescriptionsShape,
  generateDetailsShape,
  generateDirectionsShape,
} = require('../database-postgres/generationScript.js');

import 'babel-polyfill';
import { expectation } from 'sinon';

describe('Seeding Script Should generate the correct number of lines', () => {

  afterAll(() => {
    fs.unlink(__dirname, '..', 'test-postgres-data-generation', 'descriptions.csv', (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })

  it('should count 5 lines in the description csv file', (done) => {
    const results = [];
    const writeDescriptions = fs.createWriteStream(path.join(__dirname, '..', 'test-postgres-data-generation', 'descriptions.csv'));
    writeDescriptions.write('title, description, sku, primary_brand, days_to_ship\n','utf8');
    generateCSVdata(writeDescriptions, 'utf8', 5, generateDescriptionsShape, 99, () => {
      fs.createReadStream(path.join(__dirname, '..', 'test-postgres-data-generation', 'descriptions.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
      expect(results.length).toBe(5);
      done();
  });
    });
  });
  //

});
