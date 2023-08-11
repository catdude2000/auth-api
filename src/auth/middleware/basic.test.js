'use strict';

process.env.SECRET = 'TEST_SECRET';

const base64 = require('base-64');
const middleware = require('./basic');
const { db, users } = require('../models/index');

let userInfo = {
  admin: { username: 'admintest', password: 'pass'}
};

beforeAll(async () => {
  await db.sync();
  await users.create(userInfo.admin);
});

afterAll(async () => {
  await db.drop();
});

describe('Basicjs test', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  test('Login failed', async () => {
    const basicAuthString = base64.encode('username:password');
    req.headers = {
      authorization: `Basic ${basicAuthString}`,
    };
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('Successful login', async () => {
    let basicAuthString = base64.encode(`${userInfo.admin.username}:${userInfo.admin.password}`);
    req.headers = {
      authorization: `Basic ${basicAuthString}`,
    };
    await middleware(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});