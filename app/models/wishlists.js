'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tickets, { foreignKey: 'usersId' })
      this.belongsTo(models.users, { foreignKey:'tickedId' })
    }
  }
  wishlists.init({
    usersId: DataTypes.UUID,
    ticketsId: DataTypes.UUID,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'wishlists',
  });
  return wishlists;
};