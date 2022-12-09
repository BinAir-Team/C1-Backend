"use strict";
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123", 10);
<<<<<<< HEAD
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
=======
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuid(),
          firstname: null,
          lastname: null,
          gender: null,
          email: "admin@gmail.com",
          password: hashedPassword,
          phone: null,
          role: "admin",
          profile_image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          firstname: null,
          lastname: null,
          gender: null,
          email: "hayatullah@binaracademy.org",
          password: hashedPassword,
          phone: null,
          role: "admin",
          profile_image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          firstname: null,
          lastname: null,
          gender: null,
          email: "omaharani@binaracademy.org",
          password: hashedPassword,
          phone: null,
          role: "admin",
          profile_image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
>>>>>>> 1bbf91599d773a9bd10c6ecd05d5e647662cf682
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
