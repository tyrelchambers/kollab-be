require('dotenv').config();

module.exports = {
  development: {
    host: 'localhost',
    dialect: 'postgres',
    database: 'kollab',
  },
  test: {
    host: 'localhost',
    dialect: 'postgres',
    database: 'kollab_seed'
  }
}