require("dotenv").config();

module.exports = {
  development: {
    host: "localhost",
    dialect: "postgres",
    database: "kollab",
  },
  test: {
    host: "localhost",
    dialect: "postgres",
    database: "kollab_seed",
  },
  staging: {
    host: process.env.STAGING_HOST,
    dialect: "postgres",
    database: process.env.STAGING_DATABASE,
    username: process.env.STAGING_USER,
    password: process.env.STAGING_PASSWORD,
    ssl: true,
  },
};
