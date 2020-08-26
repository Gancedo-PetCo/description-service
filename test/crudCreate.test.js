const mongoose = require('mongoose');
const db = require('../database-mongodb/index');
const app = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);
const axios = require('axios');
import 'babel-polyfill';

describe('CRUD Create Endpoint Tests', () => {
  beforeEach(async () => {
    await db.Description.deleteMany({ itemId: 200 });
  });

  it('posts to the /descriptionObject endpoint', async (done) => {
    const oldCount = await db.Description.count({});
    const response = await request.post('/descriptionObject/');
    const newCount = await db.Description.count({});
    expect(response.status).toBe(200);
    expect(newCount).toEqual(oldCount + 1);
    await request.delete(`/descriptionObject/${oldCount + 100}`);
    done();
  });
});
