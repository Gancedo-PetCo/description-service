const mongoose = require('mongoose');
const db = require('../database-mongodb/index');
const app = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);
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

beforeEach(async () => {
  await db.Description.create(fakeData);
});

afterEach(async () => {
  await db.Description.deleteOne({ itemId: 200 });
});

describe('CRUD Endpoint Tests', () => {
  it('deletes an object at the /descriptionObject delete endpoint', async (done) => {
    const oldCount = await db.Description.count({});
    const response = await request.delete(
      `/descriptionObject/${oldCount + 100}`
    );
    const newCount = await db.Description.count({});
    expect(response.status).toBe(200);
    expect(newCount).toEqual(oldCount - 1);
    done();
  });

  it('posts to the /descriptionObject endpoint', async (done) => {
    const oldCount = await db.Description.count({});
    const response = await request.post('/descriptionObject/');
    const newCount = await db.Description.count({});
    expect(response.status).toBe(200);
    expect(newCount).toEqual(oldCount + 1);
    await request.delete(`/descriptionObject/${newCount + 100}`);
    done();
  });

  it('modifies an object at the /descriptionObject/:itemId put endpoint', async (done) => {
    const itemSearchingFor = await db.Description.find({ itemId: 200 });
    const oldTitle = itemSearchingFor.title;
    await request.post('/descriptionObject/200').send({
      title: 'Updated!',
    });
    const sameItemSearch = await db.Description.find({ itemId: 200 });
    const newTitle = sameItemSearch.title;
    expect(oldTitle).not.toBe('Dog Toy');
    expect(newTitle).not.toBe('Update');
    done();
  });
});
