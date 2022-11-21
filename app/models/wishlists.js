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
    }
  }
  wishlists.init({
    usersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'wishlists',
  });
  return wishlists;
};