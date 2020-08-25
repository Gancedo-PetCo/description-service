const mongoose = require('mongoose');
const db = require('../database-mongodb/index');
const app = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);
import 'babel-polyfill';

const fakeData = {
  itemId: '200',
  title: 'Dog Toy',
  description:
    'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  SKU: '2342048',
  primaryBrand: 'PetCo',
  daysToShip: 'Ships In Two Business Days',
  directions:
    'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on dogs playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
  primaryColor: 'Multicolor',
  material: 'Plush',
  length: '8 IN',
  width: '2 IN',
  additionalDetails: 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
};

const badFakeData = {
  itemId: '200',
  description:
    'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  SKU: '2342048',
  primaryBrand: 'PetCo',
  daysToShip: 'Ships In Two Business Days',
  directions:
    'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on dogs playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
  primaryColor: 'Multicolor',
  material: 'Plush',
  length: '8 IN',
  width: '2 IN',
  additionalDetails: 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
};

describe('Description Model and Associated Helper Functions Test', () => {
  beforeAll(async () => {
    await mongoose.connect(
      'mongodb://localhost/description_directions_attributes',
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async (done) => {
    await mongoose.connection.close((err) => {
      if (err) {
        console.log('error closing mongoose connection: ', err);
      } else {
        done();
      }
    });
  });

  it('creates and saves an item description', async (done) => {
    const itemDescription = new db.Description(fakeData);
    const savedItem = await itemDescription.save();

    expect(savedItem._id).toBeDefined();
    expect(savedItem.title).toBe(fakeData.title);
    expect(savedItem.additionalDetails).toBe(fakeData.additionalDetails);
    done();
  });

  it('should not save an item description if a required field is empty', async (done) => {
    const badItemDescription = new db.Description(badFakeData);
    let err;

    try {
      const badSavedItem = await badItemDescription.save();
      error = badSavedItem;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    done();
  });

  it('should find hardcoded and auto-generated entries from seed.js in database', async (done) => {
    const item100 = await db.Description.find({ itemId: 100 });
    const item109 = await db.Description.find({ itemId: 109 });
    const item129 = await db.Description.find({ itemId: 109 });

    expect(item100[0].title).toBe('CatToys Spring-Loaded Mouse');
    expect(item109[0].title).toBe(
      'BestFriends Rubber Bone with Chicken Flavor'
    );
    expect(item129[0].title).toBeDefined();
    done();
  });

  it('should return a doc with only title and primaryBrand fields when getTitleAndBrand is called', async (done) => {
    const titleAndBrandDoc = await db.getTitleAndBrand(200);
    const keys = Object.getOwnPropertyNames(titleAndBrandDoc[0]);
    const length = keys.length;

    expect(titleAndBrandDoc[0]._id).toBeFalsy();
    expect(length).toBe(2);
    expect(titleAndBrandDoc[0].title).toBeDefined();
    expect(titleAndBrandDoc[0].primaryBrand).toBeDefined();
    done();
  });

  it('should return a doc with all of the descriptionObject fields when getDescriptionObject is called', async (done) => {
    const descriptionObjectDoc = await db.getDescriptionObject(200);
    const keys = Object.getOwnPropertyNames(descriptionObjectDoc[0]);
    const length = keys.length;

    expect(length).toBe(12);
    expect(descriptionObjectDoc[0]._id).toBeFalsy();
    expect(descriptionObjectDoc[0].title).toBe(fakeData.title);
    expect(descriptionObjectDoc[0].primaryColor).toBe(fakeData.primaryColor);
    done();
  });
});

describe('Server Endpoints Test', () => {
  beforeAll(async () => {
    await mongoose.connect(
      'mongodb://localhost/description_directions_attributes',
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async (done) => {
    await mongoose.connection.close((err) => {
      if (err) {
        console.log('error closing mongoose connection: ', err);
      } else {
        done();
      }
    });
  });

  it('gets the /itemInformation endpoint', async (done) => {
    const response = await request.get('/itemInformation/102');

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('CatToys Springy Bird Toy');
    done();
  });

  it('gets the /descriptionObject endpoint', async (done) => {
    const response = await request.get('/descriptionObject/102');

    expect(response.status).toBe(200);
    expect(response.body.description.title).toBe('CatToys Springy Bird Toy');
    expect(response.body.attributes.material).toBe('Plush and Wire');
    done();
  });

  //tests for array queries
  it('correctly retrieves data from the /itemInformation endpoint when given an array of itemIds', async (done) => {
    const response = await request.get('/itemInformation/array101,105,109');
    console.log('response: ', response.body);
    const item101 = response.body[0];
    const item105 = response.body[1];
    const item109 = response.body[2];

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(item101.title).toBeDefined();
    expect(item105.title).toBeDefined();
    expect(item109.title).toBeDefined();
    done();
  });

  it('should receive a 404 error when requesting an invalid itemId in an array', async (done) => {
    const response = await request.get('/itemInformation/array199,200,201');

    expect(response.status).toBe(404);
    done();
  });
});
