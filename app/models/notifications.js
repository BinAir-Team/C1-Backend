'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {foreignKey: 'usersId'})
    }
  }
  notifications.init({
    usersId: DataTypes.UUID,
    message: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};