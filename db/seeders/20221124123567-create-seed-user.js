'use strict';
const {v4: uuid} = require('uuid');
const bcrypt = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123", 10);
    await queryInterface.bulkInsert('users', 
    [
      {
      id: uuid(),
      firstname: null,
      lastname: null,
      gender: null,
      email: "admin@gmail.com",
      verified: true,
      password: hashedPassword,
      refresh_token : null,
      phone: null,
      role: "admin",
      profile_image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid(),
      firstname: null,
      lastname: null,
      gender: null,
      email: "hayatullah@binaracademy.org",
      verified: true,
      password: hashedPassword,
      refresh_token : null,
      phone: null,
      role: "admin",
      profile_image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid(),
      firstname: null,
      lastname: null,
      gender: null,
      email: "omaharani@binaracademy.org",
      verified: true,
      password: hashedPassword,
      refresh_token : null,
      phone: null,
      role: "admin",
      profile_image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};