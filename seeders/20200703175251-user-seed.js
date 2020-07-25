'use strict';
const faker = require('faker')
const {uuid} = require('uuidv4')

const sampleUsers = []

for (let i = 0; i<5; i++) {
  sampleUsers.push({
    uuid: uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    username: faker.internet.userName(),
    email: `tychambers${i}@gmail.com`,
    twitter: faker.internet.userName(),
    instagram: faker.internet.userName(),
    password: "123456",
    availableToHelp: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now())
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', sampleUsers)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
