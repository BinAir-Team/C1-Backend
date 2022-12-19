'use strict';
const {
  Model,
  Op
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
    hooks: {
    afterCreate: async (Notifications, options) => {
      const date = new Date();
      date.setDate(date.getDate() - 1 );

      await notifications.destroy({
        where: {
          isRead: true,
          createdAt: {
            [Op.lt]: date
          }
        }
      })

    }
  },
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};