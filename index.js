'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/auth/models');
// const server = require('./src/server.js');

const PORT = process.env.PORT || 3001

db.sync().then(() => {
  server.start(PORT);
});
