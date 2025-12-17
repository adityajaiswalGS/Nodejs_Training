'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        productName: 'Laptop',
        price: 50000,
        userId: 4, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Mouse',
        price: 1000,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};