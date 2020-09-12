"use strict";

const faker = require("faker");
const { uuid } = require("uuidv4");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sampleUsers = [];

    const projectsSeed = [];

    for (let i = 0; i < 5; i++) {
      sampleUsers.push({
        uuid: uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        username: faker.internet.userName().toLowerCase(),
        email: `tychambers${i}@gmail.com`,
        twitter: faker.internet.userName(),
        instagram: faker.internet.userName(),
        password: "123456",
        availableToHelp: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        avatar: faker.image.imageUrl(),
      });
    }

    await queryInterface.bulkInsert("Users", sampleUsers);

    const users = await queryInterface.sequelize.query(
      `SELECT uuid FROM "Users";`
    );

    for (let i = 0; i < 1000; i++) {
      projectsSeed.push({
        uuid: uuid(),
        title: faker.commerce.productName(),
        headline: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        thumbnailUrl: faker.image.imageUrl(),
        topics: `${faker.lorem.word()},${faker.lorem.word()},${faker.lorem.word()}`,
        likes: faker.random.number(2500),
        dislikes: faker.random.number(2500),
        deprecatedScore: 0,
        views: faker.random.number(5000),
        wasFeatured: false,
        openPositions: true,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        userId: users[0][0].uuid,
      });
    }

    return queryInterface.bulkInsert("Projects", projectsSeed);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Users", null, {});
    return queryInterface.bulkDelete("Projects", null, {});
  },
};
