'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.notifications, { foreignKey: 'usersId' })
      this.hasMany(models.transactions, { foreignKey: 'usersId' })
      this.hasMany(models.wishlists, { foreignKey: 'usersId' })
      this.belongsTo(models.roles, {foreignKey: 'role',})
    }
  }
  users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.UUID,
    profile_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};