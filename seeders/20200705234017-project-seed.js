'use strict';

const projectsSeed= []
const faker = require("faker");
const { uuid } = require("uuidv4");

for (let i = 0; i<5; i++) {
  projectsSeed.push({
    uuid: uuid(),
    title: faker.commerce.productName(),
    headline: faker.company.catchPhrase(),
    description: faker.lorem.sentence(),
    thumbnailUrl: faker.image.imageUrl(),
    topics: `${faker.lorem.word()},${faker.lorem.word()},${faker.lorem.word()}`,
    likes: faker.random.number(),
    openPositions: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now())
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', projectsSeed)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {})

  }
};
