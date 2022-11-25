'use strict';
const {v4: uuid} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tickets', [{
      id: uuid(),
      from: "Surabaya",
      to: "Jakarta",
      airport_from: "Juanda International Airport",
      airport_to: "Soekarno Hatta International Airport",
      departure_time: "08:00",
      arrival_time: "10:00",
      date: "24-11-2022",
      type: "Pulang Pergi",
      adult_price: 100000,
      child_price: 50000,
      available: true,
      init_stock: 100,
      curr_stock: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuid(),
      from: "Jakarta",
      to: "Makassar",
      airport_from: "Halim Perdanakusuma International Airport",
      airport_to: "Sultan Hasanuddin International Airport",
      departure_time: "20:00",
      arrival_time: "21:00",
      date: "24-11-2022",
      type: "Pulang Pergi",
      adult_price: 200000,
      child_price: 100000,
      available: true,
      init_stock: 100,
      curr_stock: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('tickets', null, {});
  }
};
