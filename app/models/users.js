"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.notifications, { foreignKey: "usersId" });
      this.hasMany(models.transactions, { foreignKey: "usersId" });
      this.hasMany(models.wishlists, { foreignKey: "usersId" });
    }
  }
<<<<<<< HEAD
  users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    profile_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
=======
  users.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      gender: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.STRING,
      profile_image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
>>>>>>> 1bbf91599d773a9bd10c6ecd05d5e647662cf682
  return users;
};
