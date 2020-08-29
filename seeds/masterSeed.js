// var seed = require('seeds/1seedDescription.js');
const description = require('./1seedDescription.js');
const attributes = require('./2seedAttributes.js');
const details = require('./3seedDetails.js');
const directions = require('./4seedDirections.js');

exports.seed = function (knex, Promise) {
  return description
    .seed(knex, Promise)
    .then(function () {
      return details.seed(knex, Promise);
    })
    .then(function () {
      // next ordered migration...
      return attributes.seed(knex, Promise);
    })
    .then(function () {
      return details.seed(knex, Promise);
    })
    .then(function () {
      return directions.seed(knex, Promise);
    });
};
