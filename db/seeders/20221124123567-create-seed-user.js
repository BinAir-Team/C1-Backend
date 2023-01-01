"use strict";
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123", 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuid(),
          firstname: "admin",
          lastname: "admin",
          gender: "Laki-laki",
          email: "admin@gmail.com",
          verified: true,
          password: hashedPassword,
          phone: null,
          role: "admin",
          profile_image:
            "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          firstname: "ahmad",
          lastname: "hafidh",
          gender: "Laki-laki",
          email: "hayatullah@binaracademy.org",
          verified: true,
          password: hashedPassword,
          phone: null,
          role: "admin",
          profile_image:
            "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid(),
          firstname: "zee",
          lastname: "zee",
          gender: "Perempuan",
          email: "omaharani@binaracademy.org",
          verified: true,
          password: hashedPassword,
          phone: null,
          role: "admin",
          profile_image:
            "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
