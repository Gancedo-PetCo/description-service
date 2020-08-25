const mongoose = require('mongoose');
const db = require('../database-mongodb/index');
const app = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);
import 'babel-polyfill';

describe('CRUD Endpoint Tests', () => {
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

  it('posts to the /descriptionObject endpoint', async (done) => {
    const oldCount = await db.Description.count({});
    const response = await request.post('/descriptionObject/');
    const newCount = await db.Description.count({});
    expect(response.status).toBe(200);
    expect(newCount).toEqual(oldCount + 1);
    done();
  });
});
