"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, {foreignKey: "usersId"})
      this.belongsTo(models.tickets, {foreignKey: "ticketsId"})
    }
  }
  transactions.init({
    usersId: DataTypes.UUID,
    ticketsId: DataTypes.UUID,
    amounts: DataTypes.INTEGER,
    traveler: DataTypes.TEXT,
    payment_method: DataTypes.STRING,
    quantity: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "transactions",
  });
  return transactions;
};