// var seed = require('seeds/1seedDescription.js');
const description = require('./1seedDescription.js');
const colors = require('./2seedColors.js');
const attributes = require('./3seedAttributes.js');
const details = require('./4seedDetails.js');
const directions = require('./5seedDirections.js');

exports.seed = function (knex, Promise) {
  return description
    .seed(knex, Promise)
    .then(function () {
      return details.seed(knex, Promise);
    })
    .then(function () {
      // next ordered migration...
      return colors.seed(knex, Promise);
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
