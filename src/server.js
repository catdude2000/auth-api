'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const authRouter = require('./auth/routes');
const logger = require('./middleware/logger');


const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// Routes
app.use(authRouter);

// Catchalls
app.use(errorHandler);
app.use(notFound);


module.exports = {
  server: app,
  start: (port) => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
