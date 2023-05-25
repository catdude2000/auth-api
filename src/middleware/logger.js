'use strict';

const logger = (req, res, next) => {
  console.log('Logger was activated!', 'Req path:', req.path, 'req.method:', req.method);
  next();
};

module.exports = logger;
