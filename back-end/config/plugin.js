'use strict';

// had enabled by egg
// exports.static = true;
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
exports.validate = {
  enable: false,
  package: 'egg-validate',
};
exports.redis = {
  enable: true,
  package: 'egg-redis',
};
const path = require('path');
exports.recommender = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-recommender'),
};
