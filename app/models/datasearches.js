'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class datasearches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  datasearches.init({
    code: DataTypes.STRING,
    city: DataTypes.STRING,
    airport: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'datasearches',
  });
  return datasearches;
};