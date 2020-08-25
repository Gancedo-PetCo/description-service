const mongoose = require('mongoose');
const faker = require('faker');

//development:
mongoose.connect('mongodb://localhost/description_directions_attributes');

//production:
// mongoose.connect('mongodb://ec2-52-14-208-55.us-east-2.compute.amazonaws.com/Description', { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', () => {
  console.log('error connecting to db');
});

db.once('open', () => {
  console.log('connected to db');
});

const descriptionSchema = new mongoose.Schema({
  itemId: Number,
  title: {
    type: String,
    required: true,
  },
  description: String,
  SKU: String,
  primaryBrand: String,
  daysToShip: String,
  directions: String,
  primaryColor: String,
  material: String,
  length: String,
  width: String,
  additionalDetails: String,
});

const Description = mongoose.model('Description', descriptionSchema);

const getTitleAndBrand = (itemId) => {
  return Description.find({ itemId: itemId })
    .select('title primaryBrand -_id')
    .lean()
    .exec();
};

const getTitlesAndBrands = (itemIds) => {
  return Description.find({ itemId: { $in: itemIds } })
    .select('itemId title primaryBrand -_id')
    .lean()
    .exec();
};

const getDescriptionObject = (itemId) => {
  return Description.find({ itemId: itemId }).select('-_id -__v').lean().exec();
};

const getNextId = () => {
  return Description.find().sort({ itemId: -1 }).limit(1);
};

const createNewDescriptionDocument = (itemId) => {
  var newDoc;

  newDoc = {
    itemId: itemId,
    title: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    SKU: Math.floor(Math.random() * 10000000).toString(),
    primaryBrand: faker.company.companyName(),
    daysToShip: `Ships In ${Math.floor(Math.random() * 10)} Business Days`,
    directions: faker.lorem.paragraph(),
    primaryColor: faker.commerce.color(),
    material: faker.commerce.productMaterial(),
    length: `${Math.floor(Math.random() * 10)} IN`,
    width: `${Math.floor(Math.random() * 10)} IN`,
    additionalDetails: faker.lorem.paragraph(),
  };

  return Description.create(newDoc);
};

const deleteDescriptionDocument = (itemId) => {
  return Description.deleteOne({ itemId: itemId });
};

module.exports.Description = Description;
module.exports.db = db;
module.exports.getTitleAndBrand = getTitleAndBrand;
module.exports.getDescriptionObject = getDescriptionObject;
module.exports.getTitlesAndBrands = getTitlesAndBrands;
module.exports.getNextId = getNextId;
module.exports.createNewDescriptionDocument = createNewDescriptionDocument;
module.exports.deleteDescriptionDocument = deleteDescriptionDocument;
