'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING
      },
      to: {
        allowNull: false,
        type: Sequelize.STRING
      },
      airport_from: {
        allowNull: false,
        type: Sequelize.STRING
      },
      airport_to: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      arrival_time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_start: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      date_end: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adult_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      child_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      available: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      init_stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      curr_stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
  }
};