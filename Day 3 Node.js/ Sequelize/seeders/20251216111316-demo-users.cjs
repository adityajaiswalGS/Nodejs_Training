'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { name: 'User 1', email: 'user1@test.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User 2', email: 'user2@test.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User 3', email: 'user3@test.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User 4', email: 'user4@test.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User 5', email: 'user5@test.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User 6', email: 'user6@test.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // This allows you to "Undo" the seeding
    await queryInterface.bulkDelete('Users', null, {});
  }
};