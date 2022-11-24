'use strict';
const uuid4 = require("uuid4");
const bcrypt = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123", 10);
    await queryInterface.bulkInsert('users', 
    [
      {
      id: uuid4(),
      firstname: NULL,
      lastname: NULL,
      gender: NULL,
      email: "admin@gmail.com",
      password: hashedPassword,
      phone: NULL,
      role: "admin",
      profile_image: NULL,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid4(),
      firstname: NULL,
      lastname: NULL,
      gender: NULL,
      email: "hayatullah@binaracademy.org",
      password: hashedPassword,
      phone: NULL,
      role: "admin",
      profile_image: NULL,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuid4(),
      firstname: NULL,
      lastname: NULL,
      gender: NULL,
      email: "omaharani@binaracademy.org",
      password: hashedPassword,
      phone: NULL,
      role: "admin",
      profile_image: NULL,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};