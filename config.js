require('dotenv').config();


module.exports = {
  "development": {
    "secret": "my furry cat house",
    "database": "mongodb://localhost/kollab"
  },
  "production": {
    "secret": "my furry cat house"
  },
  "staging": {
    "secret": "my furry cat house"
  },
  "test": {
    "secret": "my furry cat house",
    "database": "mongodb://localhost/kollab-test"
  },
  "env": process.env.NODE_ENV || "development"
}