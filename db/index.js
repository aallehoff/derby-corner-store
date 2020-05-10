'use strict';

/*
  Configure and export the database connection.
*/

const Sequelize = require('sequelize');

// Initialize configuration.
const config = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: process.env.DB_OPERATORS_ALIASES
}
const db = {};

// Instantiate Sequelize.
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load models.
db.Item = require('./models/item.js')(sequelize, Sequelize)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export database object.
module.exports = db;
