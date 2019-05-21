'use strict';

var knexfile = require('./knexfile'), knex;

knex = require('knex')(knexfile.production);


module.exports = knex;
