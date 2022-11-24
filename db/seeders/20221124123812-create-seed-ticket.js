'use strict';
const {v4: uuid} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tickets', [{
      id: uuid(),
      from: "Surabaya",
      to: "Ketintang",
      hours: 2,
      date: "24-11-2022",
      type: "Ekonomi",
      adult_price: 100000,
      child_price: 50000,
      available: true,
      init_stock: 100,
      curr_stock: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuid(),
      from: "Kaliurang",
      to: "Bukit Tinggi",
      hours: 3,
      date: "24-11-2022",
      type: "Bisnis",
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
