'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transactions, { foreignKey: 'ticketsId' })
      this.hasMany(models.wishlists, { foreignKey: 'ticketsId' })
    }
  }
  tickets.init({
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    hours: DataTypes.DOUBLE,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    adult_price: DataTypes.INTEGER,
    child_price: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    init_stock: DataTypes.INTEGER,
    curr_stock: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tickets',
  });
  return tickets;
};