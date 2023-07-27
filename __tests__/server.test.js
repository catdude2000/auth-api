'use strict';

require('dotenv').config();

const server = require('../src/server');
const supertest = require('supertest');
const mockServer = supertest(server);
const { sequelize } = require('../src/auth/models');

const user1 = { username: 'mike', password: 'pass'};

beforeAll(async (done) => {
  await sequelize.sync();
  done();
});
afterAll(async (done) => {
  await sequelize.drop();
  done();
});

describe('test the server routes and db', () => {
  test('we can post a new user to /signup', async () => {
    const res = (await mockServer.post('/signup')).setEncoding(user1);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text).username).toBe('mike');
    expect(JSON.parse(res.text).password).toBeTruthy();
  });
  test('we can send a user via a basic auth to /signin', async () => {
    const res = await mockServer .post('/signin') .auth(user1.username, user1.password);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text).username).toBe('mike');
    expect(JSON.parse(res.text).password).toBeTruthy();
  });
});