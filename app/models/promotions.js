"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class promotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  promotions.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
      promo_code: DataTypes.STRING,
      discount: DataTypes.INTEGER,
      terms: DataTypes.TEXT,
      promo_image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "promotions",
    }
  );
  return promotions;
};
