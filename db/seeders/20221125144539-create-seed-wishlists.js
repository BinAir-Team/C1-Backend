"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("wishlists", [{
      id: uuidv4(),
      usersId: uuidv4(),
      ticketsId:  uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      usersId: uuidv4(),
      ticketsId:  uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wishlists", null, {});
  }
};
