const mongoose = require('mongoose');
const db = require('../database-mongodb/index');
const app = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);
const axios = require('axios');
import 'babel-polyfill';

const fakeData = [
  {
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
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
];

describe('CRUD Delete Endpoint Tests', () => {
  beforeEach(async () => {
    await db.Description.deleteMany({ itemId: 200 });
    await db.Description.create(fakeData);
  });

  it('deletes an object at the /descriptionObject delete endpoint', async (done) => {
    const oldCount = await db.Description.count({});
    const response = await request.delete(
      `/descriptionObject/${oldCount + 99}`
    );
    const newCount = await db.Description.count({});
    console.log('HERE IS THE OLD COUNT', oldCount);
    console.log('HERE IS THE NEW COUNT', newCount);

    expect(response.status).toBe(200);
    expect(newCount).toEqual(oldCount - 1);
    done();
  });
});
